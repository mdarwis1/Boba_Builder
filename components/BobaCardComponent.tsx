import defaultStyles from "@/styles/defaultStyles";
import React from "react";
import { Image, Text, TouchableHighlight, View } from "react-native";

type Props = {
  title: string;
  subtitle?: string;
  imageUrl?: string;
  content?: string;
  onPress: () => void;
};

const bobaCard: React.FC<Props> = ({
  title,
  subtitle,
  imageUrl,
  content,
  onPress,
}) => {
  return (
    <TouchableHighlight
      onPress={onPress}
      underlayColor="#ddd"
      style={defaultStyles.card}
    >
      <View>
        {imageUrl && (
          <Image source={{ uri: imageUrl }} style={defaultStyles.cardImage} />
        )}
        <View style={defaultStyles.cardContent}>
          <Text style={defaultStyles.cardTitle}>{title}</Text>
          {subtitle && (
            <Text style={defaultStyles.cardSubtitle}>{subtitle}</Text>
          )}
          <Text style={defaultStyles.cardText}>{content}</Text>
        </View>
      </View>
    </TouchableHighlight>
  );
};

export default bobaCard;
