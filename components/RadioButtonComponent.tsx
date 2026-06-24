import defaultStyles from "@/styles/defaultStyles";
import * as React from "react";
import { View } from "react-native";
import { RadioButton } from "react-native-paper";

type Option<T> = {
  label: string;
  value: T;
};

// Learned from ChatGPT: T(generics) allows component to adapt its type to
// whatever string passed in, since the state variables only take in specific strings
type Props<T extends string> = {
  options: Option<T>[];
  selectedValue: T;
  onChange: (nextValue: T) => void;
};

// Got Radio Button from React Native Paper
const RadioButtonComponent = <T extends string>({
  options,
  selectedValue,
  onChange,
}: Props<T>) => {
  return (
    <View style={defaultStyles.radioContainer}>
      <RadioButton.Group
        onValueChange={(val) => onChange(val as T)}
        value={selectedValue}
      >
        {options.map((opt) => (
          <RadioButton.Item
            key={opt.value}
            label={opt.label}
            value={opt.value}
          />
        ))}
      </RadioButton.Group>
    </View>
  );
};

export default RadioButtonComponent;
