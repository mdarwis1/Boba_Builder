import Button from "@/components/Button";
import ItemRow from "@/components/ItemRow";
import {
  clearCart,
  fetchCartItems,
  markCart,
  type Item,
} from "@/data/favoritesdb";
import defaultStyles from "@/styles/defaultStyles";
import { useFocusEffect } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useCallback, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  Keyboard,
  Modal,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableWithoutFeedback,
  View,
} from "react-native";

export default function FavoritesScreen() {
  const db = useSQLiteContext();

  const [items, setItems] = useState<Item[]>([]);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  // modal state
  const [tipModalVisible, setTipModalVisible] = useState(false);
  const [selectedTip, setSelectedTip] = useState<number>(0);

  // tip state
  const [customTip, setCustomTip] = useState("");
  const [isCustom, setIsCustom] = useState(false);

  const [cartTotal, setCartTotal] = useState(0);

  const loadItems = async () => {
    try {
      const value = await fetchCartItems(db);
      setItems(value);

      const total = value.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      setCartTotal(total);
    } catch (err) {
      console.log("Failed to fetch items", err);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadItems();
    }, [])
  );

  const deleteFromCart = async (id: number) => {
    Alert.alert("Remove item from cart?", "This cannot be undone.", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            await markCart(db, id, false);
            await loadItems();
          } catch (err) {
            console.log("Failed to remove item from cart", err);
          }
        },
      },
    ]);
  };

  return (
    <View style={defaultStyles.container}>
      <FlatList
        style={defaultStyles.list}
        data={items}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={() => (
          <View style={defaultStyles.itemSeparator} />
        )}
        renderItem={({ item }) => (
          <TouchableHighlight underlayColor="#ddd">
            <ItemRow
              name={item.name}
              quantity={item.quantity}
              image={item.image ? { uri: item.image } : undefined}
              onDelete={() => deleteFromCart(item.id)}
              price={item.price}
              onPress={() => setSelectedItem(item)}
            />
          </TouchableHighlight>
        )}
        ListEmptyComponent={
          <Text style={defaultStyles.listEmptyComponent}>No items yet.</Text>
        }
        contentContainerStyle={
          items.length === 0
            ? { flexGrow: 1, justifyContent: "center" }
            : undefined
        }
      />

      <View style={defaultStyles.subtotalContainer}>
        <Text style={defaultStyles.tipText}>
          Subtotal: ${cartTotal.toFixed(2)}
        </Text>
        <Text style={defaultStyles.tipText}>
          Tip ({selectedTip}%): ${((cartTotal * selectedTip) / 100).toFixed(2)}
        </Text>
        <Text style={defaultStyles.tipText}>
          Total: ${(cartTotal + (cartTotal * selectedTip) / 100).toFixed(2)}
        </Text>
        <Button title="Checkout" onPress={() => setTipModalVisible(true)} />
      </View>

      <Modal
        visible={selectedItem !== null}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setSelectedItem(null)}
      >
        <View style={defaultStyles.modalBackground}>
          <View style={defaultStyles.modalContent}>
            <Image
              source={
                selectedItem?.image
                  ? { uri: selectedItem.image }
                  : require("../../images/empty_cup.png")
              }
              style={defaultStyles.modalImage}
            />
            <Text style={defaultStyles.modalTitle}> {selectedItem?.name}</Text>

            <Text style={defaultStyles.drinkDetailText}>Drink Details:</Text>

            <View style={defaultStyles.ingredientsContainer}>
              <Text style={defaultStyles.ingredientText}>
                Flavor: {selectedItem?.flavor}
              </Text>
              <Text style={defaultStyles.ingredientText}>
                Sweetness: {selectedItem?.sweetness}
              </Text>
              <Text style={defaultStyles.ingredientText}>
                Boba Status: Has {selectedItem?.boba}
              </Text>
            </View>
            <Text style={defaultStyles.modalQty}>
              Quantity: {selectedItem?.quantity}
            </Text>

            <Button title="Close" onPress={() => setSelectedItem(null)} />
          </View>
        </View>
      </Modal>

      {/* Tip Selection Modal */}
      <Modal
        visible={tipModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setTipModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={defaultStyles.modalBackground}>
            <View style={defaultStyles.modalContent}>
              <Text style={defaultStyles.modalTitle}>Select a Tip</Text>

              <View style={defaultStyles.tipScreenContainer}>
                {[0, 5, 10, 15, 20].map((tip) => (
                  <Button
                    key={tip}
                    title={`${tip}%`}
                    onPress={() => {
                      setSelectedTip(tip);
                      setSelectedTip(tip);
                      setIsCustom(false);
                    }}
                  />
                ))}

                <Button
                  title="Custom"
                  onPress={() => {
                    setIsCustom(true);
                    setSelectedTip(0);
                  }}
                />

                {isCustom && (
                  <TextInput
                    style={defaultStyles.textInputBox}
                    placeholder="Enter custom tip %"
                    keyboardType="numeric"
                    value={customTip}
                    onChangeText={(text) => {
                      setCustomTip(text);
                      setSelectedTip(Number(text) || 0);
                    }}
                  />
                )}
              </View>

              {/* LIVE UPDATED TOTAL */}
              <Text style={defaultStyles.tipText}>
                Tip: {selectedTip}% = $
                {((cartTotal * selectedTip) / 100).toFixed(2)}
              </Text>

              <Text style={defaultStyles.newTotalText}>
                New Total: $
                {(cartTotal + (cartTotal * selectedTip) / 100).toFixed(2)}
              </Text>
              <View style={defaultStyles.buttonContainer}>
                <Button
                  title="Confirm"
                  onPress={async () => {
                    console.log("Selected tip:", selectedTip);

                    // Resets flatlist after order submitted
                    await clearCart(db);

                    setItems([]);
                    setCartTotal(0);
                    setSelectedTip(0);

                    setTipModalVisible(false);

                    Alert.alert(
                      "Thank You!",
                      `Your order total with ${selectedTip}% tip is $${(
                        cartTotal +
                        (cartTotal * selectedTip) / 100
                      ).toFixed(2)}.`,
                      [{ text: "OK" }]
                    );
                  }}
                />
                <Button
                  title="Cancel"
                  onPress={() => setTipModalVisible(false)}
                />
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}
