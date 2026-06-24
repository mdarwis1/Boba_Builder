import colors from "@/styles/colors";
import Feather from "@expo/vector-icons/Feather";
import { Tabs, useLocalSearchParams, useRouter } from "expo-router";
import { useEffect } from "react";

export default function TabsLayout() {
  const { name } = useLocalSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (!name) {
      router.replace("/");
    }
  }, [name]);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.backgroundMain,
        tabBarInactiveTintColor: colors.accents,
        headerStyle: {
          backgroundColor: colors.componentDark,
        },
        headerShadowVisible: false,
        headerTintColor: colors.accents,
        tabBarStyle: {
          backgroundColor: colors.componentDark,
        },
      }}
    >
      <Tabs.Screen
        name="builder"
        options={{
          headerTitle: "Boba Builder",
          tabBarIcon: ({ color }) => (
            <Feather name="coffee" size={24} color={color} />
          ),
        }}
        initialParams={{ name }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          headerTitle: name + "'s Favorites",
          tabBarIcon: ({ color }) => (
            <Feather name="star" size={24} color={color} />
          ),
        }}
        initialParams={{ name }}
      />
      <Tabs.Screen
        name="checkout"
        options={{
          headerTitle: "Checkout",
          tabBarIcon: ({ color }) => (
            <Feather name="shopping-cart" size={24} color={color} />
          ),
        }}
        initialParams={{ name }}
      />
    </Tabs>
  );
}
