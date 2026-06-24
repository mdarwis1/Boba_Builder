import defaultStyles from "@/styles/defaultStyles";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

type Props = {
  name: string;
  quantity: number;
  image?: { uri: string };
  price: number;
  onDelete: () => void;
  onPress?: () => void;
};

const ItemRow: React.FC<Props> = ({
  name,
  quantity,
  image,
  price,
  onDelete,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={defaultStyles.favoriteItemRow}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {image && (
        <Image source={image} style={defaultStyles.favoritesListImage} />
      )}

      {/* Item Info */}
      <View style={{ flexShrink: 1, flexGrow: 1, marginRight: 10 }}>
        <Text style={defaultStyles.cartItemName} numberOfLines={1}>
          {name}
        </Text>

        <Text style={defaultStyles.cartItemDetails}>Qty: {quantity}</Text>

        <Text style={defaultStyles.cartItemDetails}>${price.toFixed(2)}</Text>
      </View>

      {/* Delete Button */}
      <TouchableOpacity
        onPress={onDelete}
        accessibilityRole="button"
        accessibilityLabel={`Delete ${name}`}
        style={defaultStyles.iconButton}
      >
        <MaterialIcons name="delete" size={24} color="#D32F2F" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default ItemRow;
