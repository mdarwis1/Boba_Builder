import colors from "@/styles/colors";
import defaultStyles from "@/styles/defaultStyles";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import React from "react";
import { TouchableHighlight, View } from "react-native";

type propsType = {
  onPress: () => void;
};

const EditIconButton: React.FC<propsType> = ({ onPress }) => {
  return (
    <TouchableHighlight
      style={defaultStyles.iconButton}
      underlayColor="#ddd"
      onPress={onPress}
    >
      <View style={defaultStyles.icon}>
        <MaterialCommunityIcons
          name="pencil"
          size={24}
          color={colors.editColor}
        />
      </View>
    </TouchableHighlight>
  );
};

export default EditIconButton;
