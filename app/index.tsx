import Button from "@/components/Button";
import TextField from "@/components/TextField";
import defaultStyles from "@/styles/defaultStyles";
import { useRouter } from "expo-router";
import { useState } from "react";
import { FlatList, Image, Text, View } from "react-native";

export default function IndexScreen() {
  const router = useRouter();
  const [name, setName] = useState<string>("");

  const openTabNav = () => {
    if (name != "") {
      setName(name);
      router.push({ pathname: "/(tabs)/builder", params: { name } });
    } else alert("Please enter your name to start your order");
  };

  return (
    /*Learned from ChatGPT: can't scroll using ScrolLView due to DropDown elements
      so can use FlatList as a scroll container, syntax from ChatGPT*/
    <FlatList
      data={[{ key: "form" }]}
      keyExtractor={(item) => item.key}
      contentContainerStyle={defaultStyles.loginScroll}
      keyboardShouldPersistTaps="handled"
      style={defaultStyles.loginContainer}
      renderItem={() => (
        <View style={defaultStyles.container}>
          <Text style={defaultStyles.text}>Boba Builder Login</Text>
          <Image
            source={require("../images/boba_image_2.png")}
            style={[defaultStyles.builderImage]}
            resizeMode="center"
          />
          <TextField
            placeholder="Name"
            value={name}
            onChangeText={setName}
            style={defaultStyles.textInputBox}
          />

          <Button title="Welcome!!" onPress={openTabNav} />
        </View>
      )}
    />
  );
}
