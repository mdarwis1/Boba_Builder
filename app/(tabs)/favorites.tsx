import AddIconButton from "@/components/AddIconButton";
import BobaCardComponent from "@/components/BobaCardComponent";
import DeleteIconButton from "@/components/DeleteIconButton";
import EditIconButton from "@/components/EditIconButton";
import SaveIconButton from "@/components/SaveIconButton";
import TextField from "@/components/TextField";
import {
  fetchFavorites,
  insertItem,
  markCart,
  markFavorite,
  updateItem,
  type Item,
} from "@/data/favoritesdb";
import colors from "@/styles/colors";
import defaultStyles from "@/styles/defaultStyles";
import { useFocusEffect } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useCallback, useState } from "react";
import { Alert, FlatList, Image, Text, View } from "react-native";

export default function FavoritesScreen() {
  const db = useSQLiteContext();

  const [editingId, setEditingId] = useState<number | null>(null);
  const [newName, setNewName] = useState<string>("");

  const [items, setItems] = useState<Item[]>([]);

  const loadItems = async () => {
    try {
      const value = await fetchFavorites(db);
      setItems(value);
    } catch (err) {
      console.log("Failed to fetch items", err);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadItems();
    }, [])
  );

  const deleteFromFavorites = async (id: number) => {
    Alert.alert("Remove item from favorites?", "This cannot be undone.", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            await markFavorite(db, id, false);
            await loadItems();
          } catch (err) {
            console.log("Failed to remove item from favorites", err);
          }
        },
      },
    ]);
  };

  const startRename = (item: Item) => {
    setEditingId(item.id);
    setNewName(item.name);
  };

  const saveRename = async () => {
    if (!newName.trim() || editingId === null) return;

    try {
      // Learned from ChatGPT: update the name but keep quantity and image the same
      const itemToUpdate = items.find((i) => i.id === editingId);
      if (!itemToUpdate) return;

      await updateItem(
        db,
        editingId,
        newName.trim(),
        itemToUpdate.quantity,
        itemToUpdate.image ?? ""
      );

      setEditingId(null);
      setNewName("");
      await loadItems();
    } catch (err) {
      console.log("Failed to rename item", err);
    }
  };

  const addToCart = async (id: number) => {
    try {
      await markCart(db, id, true);
      await loadItems();
    } catch (err) {
      console.log("Failed to add to cart", err);
    }
  };

  const addPresetToCart = async () => {
    try {
      const newId = await insertItem(
        db,
        "Strawberry Matcha",
        1,
        "https://www.shutterstock.com/image-photo/soft-watercolor-illustration-strawberry-matcha-260nw-2628144433.jpg",
        5.5,
        "Strawberry and matcha",
        "100%",
        "Boba"
      );

      await markCart(db, newId, true);

      await loadItems();
    } catch (err) {
      console.log("Failed to add preset item", err);
    }
  };

  const addPresetToCartAlert = () => {
    Alert.alert("Add to cart?", "This preset drink will be added.", [
      { text: "Cancel", style: "cancel" },
      { text: "Add", style: "default", onPress: addPresetToCart },
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
          <View style={defaultStyles.favoriteItemRow}>
            {/*Learned from ChatGPT: how to make image thumbnail on each flatlist element*/}
            <Image
              source={
                item.image
                  ? { uri: item.image }
                  : require("../../images/empty_cup.png")
              }
              style={defaultStyles.favoritesListImage}
            />
            {editingId === item.id ? (
              // Show input and save button when editing
              <>
                <TextField
                  value={newName}
                  onChangeText={setNewName}
                  placeholder="New Name"
                  placeholderTextColor={colors.placeholderTextColor}
                  style={defaultStyles.renameBox}
                />
                <SaveIconButton onPress={saveRename} />
              </>
            ) : (
              <>
                <Text style={[defaultStyles.cartItemName, { flex: 1 }]}>
                  {item.name}
                </Text>
                <EditIconButton onPress={() => startRename(item)} />
                <DeleteIconButton
                  onPress={() => deleteFromFavorites(item.id)}
                />
                <AddIconButton onPress={() => addToCart(item.id)} />
              </>
            )}
          </View>
        )}
        ListEmptyComponent={
          <Text style={defaultStyles.listEmptyComponent}>
            No items yet. Add your first one above.
          </Text>
        }
        contentContainerStyle={
          items.length === 0
            ? { flexGrow: 1, justifyContent: "center" }
            : undefined
        }
      />
      <BobaCardComponent
        title="Strawberry Matcha"
        subtitle="Large"
        imageUrl="https://www.shutterstock.com/image-photo/soft-watercolor-illustration-strawberry-matcha-260nw-2628144433.jpg"
        content="A delicious matcha with strawberry flavors"
        onPress={addPresetToCartAlert}
      />
    </View>
  );
}
