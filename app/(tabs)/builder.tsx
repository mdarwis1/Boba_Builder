import Button from "@/components/Button";
import RadioButtonComponent from "@/components/RadioButtonComponent";
import {
  fetchItems,
  insertItem,
  Item,
  markCart,
  markFavorite,
} from "@/data/favoritesdb";
import colors from "@/styles/colors";
import defaultStyles from "@/styles/defaultStyles";
import Slider from "@react-native-community/slider";
import * as Asset from "expo-asset";
import { useSQLiteContext } from "expo-sqlite";
import React, { useEffect, useState } from "react";
import { FlatList, Image, Text, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

const localBobaImage = Asset.Asset.fromModule(
  require("../../images/empty_cup.png")
).uri;

type BaseType = "milk" | "fruit" | "";
type FlavorType =
  | "classic"
  | "brown sugar"
  | "taro"
  | "mango"
  | "lychee"
  | "strawberry"
  | "";

interface FlavorOption {
  label: string;
  value: FlavorType;
}

export default function BuilderScreen() {
  //SQL state
  const db = useSQLiteContext();

  const [items, setItems] = useState<Item[]>([]);

  const [base, setBase] = useState<BaseType>("");
  const [flavor, setFlavor] = useState<FlavorType>("");

  // state for dropdown
  const [baseOpen, setBaseOpen] = useState(false);
  const [flavorOpen, setFlavorOpen] = useState(false);

  // state for radio buttons
  const [sizeSelection, setSizeSelection] = useState<"Small" | "Large">(
    "Small"
  );

  const [boba, setBoba] = useState<"Boba" | "No Boba">("Boba");

  // state for base selection
  const [baseItems, setBaseItems] = useState([
    { label: "Milk Tea", value: "milk" },
    { label: "Fruit Tea", value: "fruit" },
  ]);

  // array storing images
  const flavorImages = {
    classic: require("../../images/classic_milktea.png"),
    "brown sugar": require("../../images/brown_sugar.png"),
    taro: require("../../images/taro_milktea.png"),
    mango: require("../../images/mango_tea.png"),
    lychee: require("../../images/lychee_tea.png"),
    strawberry: require("../../images/strawberry_tea.png"),
  };

  // default image
  const emptyCupImage = require("../../images/empty_cup.png");

  const loadItems = async () => {
    try {
      const allItems = await fetchItems(db);
      console.log("Favorites loaded", allItems);
      setItems(allItems);
    } catch (err) {
      console.log("Failed to load items", err);
    }
  };

  const saveDrink = async (): Promise<number | null> => {
    const finalName = `${sizeSelection} ${flavor} ${
      base === "milk" ? "Milk Tea" : "Fruit Tea"
    } with ${boba} (${value}% sweetness)`;

    let finalPrice = 3;
    if (sizeSelection === "Large") finalPrice += 1;
    if (boba === "Boba") finalPrice += 1;
    if (base === "milk") finalPrice += 0.5;
    else finalPrice += 1.5;

    try {
      const selectedImageUri = flavor
        ? // Learned from ChatGPT: uri converts asset to string that can be stored
          // in database for SQL
          Asset.Asset.fromModule(flavorImages[flavor]).uri
        : localBobaImage;

      const newId = await insertItem(
        db,
        finalName,
        1,
        selectedImageUri,
        finalPrice,
        flavor,
        `${value}%`,
        boba
      );
      return newId;
    } catch (e) {
      console.log("Failed to insert drink", e);
      return null;
    }
  };

  const addToFavorites = async () => {
    const itemId = await saveDrink();
    if (itemId !== null) {
      try {
        await markFavorite(db, itemId, true);
        console.log("Item added to favorites");
        await loadItems();
      } catch (err) {
        console.log("Failed to add item to favorites", err);
      }
    }
  };

  const addToCart = async () => {
    const itemId = await saveDrink();
    if (itemId !== null) {
      try {
        await markCart(db, itemId, true);
        console.log("Item added to cart");
        await loadItems();
      } catch (err) {
        console.log("Failed to add item to cart", err);
      }
    }
  };

  // stores options for flavors
  const flavorOptions: Record<Exclude<BaseType, "">, FlavorOption[]> = {
    milk: [
      { label: "Classic", value: "classic" },
      { label: "Brown Sugar", value: "brown sugar" },
      { label: "Taro", value: "taro" },
    ],
    fruit: [
      { label: "Mango", value: "mango" },
      { label: "Lychee", value: "lychee" },
      { label: "Strawberry", value: "strawberry" },
    ],
  };

  const [flavorItems, setFlavorItems] = useState<FlavorOption[]>([]);

  // UseEffect updates flavor options when base changes
  useEffect(() => {
    if (base) {
      setFlavorItems(flavorOptions[base]);
      setFlavor("");
    } else {
      setFlavorItems([]);
      setFlavor("");
    }
  }, [base]);

  useEffect(() => {
    const fetchData = async () => {
      await loadItems();
    };
    fetchData();
  }, []);

  //Sliders stuff
  const [value, setValue] = useState(50);

  // for switching image, accesses image array
  const switchImage = () => (
    <View style={defaultStyles.builderImageContainer}>
      <Image
        source={flavor ? flavorImages[flavor] : emptyCupImage}
        style={defaultStyles.builderImage}
        resizeMode="contain"
      />
    </View>
  );

  return (
    <View style={defaultStyles.container}>
      <Text style={defaultStyles.text}>Boba Builder</Text>
      {/*Learned from ChatGPT: can't scroll using ScrolLView due to DropDown elements
      so can use FlatList as a scroll container, syntax from ChatGPT*/}
      <FlatList
        data={[{ key: "form" }]}
        renderItem={() => (
          <>
            {switchImage()}

            <RadioButtonComponent
              options={[
                { label: "Small", value: "Small" },
                { label: "Large", value: "Large" },
              ]}
              selectedValue={sizeSelection}
              onChange={setSizeSelection}
            />

            {/* Base Dropdown */}
            <Text style={defaultStyles.text}>Choose your base:</Text>
            <DropDownPicker
              open={baseOpen}
              value={base}
              items={baseItems}
              setOpen={setBaseOpen}
              setValue={setBase}
              setItems={setBaseItems}
              placeholder="-- Select base --"
              style={defaultStyles.dropdown}
              dropDownContainerStyle={defaultStyles.dropdownContainer}
              zIndex={2000}
              zIndexInverse={2000}
            />

            {/* Flavor Dropdown */}
            {base ? (
              <>
                <Text style={defaultStyles.text}>Choose your flavor:</Text>
                <DropDownPicker
                  open={flavorOpen}
                  value={flavor}
                  items={flavorItems}
                  setOpen={setFlavorOpen}
                  setValue={setFlavor}
                  setItems={setFlavorItems}
                  placeholder="-- Select flavor --"
                  style={defaultStyles.dropdown}
                  dropDownContainerStyle={defaultStyles.dropdownContainer}
                  zIndex={1000}
                  zIndexInverse={1000}
                />
              </>
            ) : null}
            <Text style={defaultStyles.text}>Choose your sweetness:</Text>
            <View style={defaultStyles.sliderContainer}>
              <Text style={defaultStyles.sliderLabel}>Value: {value}%</Text>
              <Slider
                style={defaultStyles.slider}
                minimumValue={0}
                maximumValue={100}
                minimumTrackTintColor={colors.mainText}
                maximumTrackTintColor={colors.componentLight}
                step={25}
                value={value}
                onValueChange={setValue}
              />
            </View>

            <RadioButtonComponent
              options={[
                { label: "Boba", value: "Boba" },
                { label: "No Boba", value: "No Boba" },
              ]}
              selectedValue={boba}
              onChange={setBoba}
            />
            <View style={defaultStyles.buttonContainer}>
              <Button title="Favorite" onPress={addToFavorites} />
              <Button title="Add to Cart" onPress={addToCart} />
            </View>
          </>
        )}
        keyExtractor={(item) => item.key}
        scrollEnabled={!baseOpen && !flavorOpen}
        keyboardShouldPersistTaps="handled"
      />
    </View>
  );
}
