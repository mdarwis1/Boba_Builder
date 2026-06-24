import colors from "@/styles/colors";
import defaultStyles from "@/styles/defaultStyles";
import React from "react";
import { Text, TouchableHighlight } from "react-native";

type propsType = {
  title: string;
  color?: string;
  onPress: () => void;
};

const Button: React.FC<propsType> = ({
  title,
  color = colors.accents,
  onPress,
}) => {
  return (
    <TouchableHighlight
      style={[defaultStyles.button, { backgroundColor: color }]}
      onPress={onPress}
      underlayColor={colors.backgroundSecondary}
    >
      <Text style={defaultStyles.buttonText}>{title}</Text>
    </TouchableHighlight>
  );
};

export default Button;
