import React, { useEffect, useState } from 'react';
import { Text, Image, Button, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useCartStore } from '../../context/cartContext';

type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
};

export default function ProductDetails() {
  const { id } = useLocalSearchParams();
  const [product, setProduct] = useState<Product | null>(null);
  const { addToCart } = useCartStore();

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [id]);

  if (!product) return <Text style={styles.loading}>Chargement...</Text>;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={{ uri: product.image }}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.price}>{product.price} €</Text>
      <Text style={styles.description}>{product.description}</Text>
      <Button
        title="Ajouter au panier"
        onPress={() => addToCart({ ...product, quantity: 1 })}
        color="#80ec91"
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#fff', alignItems: 'center' },
  image: { width: 200, height: 200, marginBottom: 20 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
  price: { fontSize: 18, color: '#80ec91', marginBottom: 10 },
  description: { fontSize: 16, textAlign: 'center', marginBottom: 20 },
  loading: { flex: 1, textAlign: 'center', marginTop: 20 },
});