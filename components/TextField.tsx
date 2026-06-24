import React from "react";
import { TextInput, View } from "react-native";

import defaultStyles from "@/styles/defaultStyles";


type propsType = {
  placeholder: string;
  placeholderTextColor?: string;
  borderColor?: string;
  value: string; 
  onChangeText: (newValue: string) => void; 
  style?: object;
};

const TextField: React.FC<propsType> = ({
  placeholder,
  placeholderTextColor ='black',
  borderColor = 'red',
  value,
  onChangeText,
  style,
}) => {
  return (
    <View>
      <TextInput
        style={[defaultStyles.textInputBox, { borderColor: borderColor }, style]}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

export default TextField;
