import defaultStyles from "@/styles/defaultStyles";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import React from "react";
import { TouchableHighlight, View } from "react-native";

type propsType = {
  onPress: () => void;
};

const AddIconButton: React.FC<propsType> = ({ onPress }) => {
  return (
    <TouchableHighlight
      style={defaultStyles.iconButton}
      underlayColor="#ddd"
      onPress={onPress}
    >
      <View style={defaultStyles.icon}>
        <MaterialCommunityIcons
          name="receipt-text-plus-outline"
          size={24}
          color="black"
        />
      </View>
    </TouchableHighlight>
  );
};

export default AddIconButton;
