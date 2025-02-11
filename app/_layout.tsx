import { Stack } from "expo-router";
import { View, Text, Pressable } from "react-native";
import { useCartStore } from '../context/cartContext';
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import React from "react";

export default function Layout() {
  const router = useRouter();
  const { cart } = useCartStore();
  const cartItemCount = cart.reduce(
    (acc: number, item: { quantity: number }) => acc + item.quantity,
    0
  );

  return (
    <Stack
      screenOptions={{
        headerTitleAlign: "center",
        headerStyle: { backgroundColor: "#80ec91" },
        headerRight: () => (
          <Pressable onPressIn={() => router.push("/cart")}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                padding: 10,
              }}
            >
              <Ionicons name="cart" size={24} color="black" />
              {cartItemCount > 0 && (
                <View
                  style={{
                    position: "absolute",
                    top: -5,
                    right: -5,
                    backgroundColor: "red",
                    borderRadius: 10,
                    paddingHorizontal: 6,
                    paddingVertical: 2,
                  }}
                >
                  <Text style={{ color: "white", fontSize: 12 }}>
                    {cartItemCount}
                  </Text>
                </View>
              )}
            </View>
          </Pressable>
        ),
      }}
    >
      {/* Titre en remplacement des noms de routes */}
      <Stack.Screen name="index" options={{ title: "Neon Shop" }} />
      <Stack.Screen
        name="product/[id]"
        options={{
          title: "Neon Shop",
          headerTitleAlign: "left",
        }}
      />
      <Stack.Screen
        name="cart"
        options={{
          title: "Your Cart",
          headerTitleAlign: "left",
        }}
      />
    </Stack>
  );
}
