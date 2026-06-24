import defaultStyles from "@/styles/defaultStyles";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { TouchableHighlight, View } from "react-native";

type propsType = {
  onPress: () => void;
};

const SaveIconButton: React.FC<propsType> = ({ onPress }) => {
  return (
    <TouchableHighlight
      style={defaultStyles.iconButton}
      underlayColor="#ddd"
      onPress={onPress}
    >
      <View style={defaultStyles.icon}>
        <Ionicons name="checkmark-sharp" size={24} color="black" />
      </View>
    </TouchableHighlight>
  );
};

export default SaveIconButton;
