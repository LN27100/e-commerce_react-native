import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useCartStore } from "../context/cartContext";
import { Ionicons } from "@expo/vector-icons"; 
import React from "react";

type MyCartItem = {
  id: number;
  title: string;
  image: string;
  quantity: number;
  price: number;
};

export default function CartScreen() {
  const { cart, removeFromCart, updateQuantity } = useCartStore();

  const typedCart = cart as unknown as MyCartItem[];

  const cartItemCount = typedCart.reduce(
    (acc: number, item: MyCartItem) => acc + item.quantity,
    0
  );

  const totalPrice = typedCart.reduce(
    (acc: number, item: MyCartItem) => acc + item.price * item.quantity,
    0
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your cart</Text>

      {typedCart.length === 0 ? (
        <Text style={styles.emptyText}>Your cart is empty
.</Text>
      ) : (
        <FlatList
          data={typedCart}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Image source={{ uri: item.image }} style={styles.image} resizeMode="contain" />
              <View style={styles.details}>
                <Text style={styles.name}>{item.title}</Text>
                <Text style={styles.price}>Price: €{item.price}</Text>
                
                <View style={styles.actionContainer}>
                  <View style={styles.quantityContainer}>
                    <TouchableOpacity 
                      style={styles.quantityButton} 
                      onPress={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      <Text style={styles.quantityText}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.quantity}>{item.quantity}</Text>
                    <TouchableOpacity 
                      style={styles.quantityButton} 
                      onPress={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Text style={styles.quantityText}>+</Text>
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity 
                    style={styles.deleteButton} 
                    onPress={() => removeFromCart(item.id)}
                  >
                    <Ionicons name="trash-outline" size={20} color="white" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        />
      )}

      {/* Affichage du prix total formaté avec 2 décimales */}
      <Text style={styles.total}>Total: {totalPrice.toFixed(2)} €</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
    color: "#80ec91",
  },
  emptyText: {
    textAlign: "center",
    fontSize: 16,
    color: "gray",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
  },
  image: {
    width: 60,
    height: 60,
    marginRight: 10,
  },
  details: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  price: {
    fontSize: 14,
    color: "#999999",
  },
  actionContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 5,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantity: {
    marginHorizontal: 10,
    fontSize: 16,
  },
  quantityButton: {
    backgroundColor: "#80ec91",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  quantityText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  total: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
  },
  deleteButton: {
    backgroundColor: "#942121",
    padding: 5,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    width: 30, 
    height: 30,
  },
});
