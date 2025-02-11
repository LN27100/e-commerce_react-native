import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter, Link } from 'expo-router';

type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
};

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  const renderItem = ({ item }: { item: Product }) => (
    <TouchableOpacity style={styles.card} onPress={() => router.push(`/product/${item.id}`)}>
      <Image source={{ uri: item.image }} style={styles.image} resizeMode="contain" />
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
        <Text style={styles.price}>{item.price} €</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
    
     <FlatList
  data={products}
  keyExtractor={(item) => item.id.toString()}
  renderItem={renderItem}
  numColumns={2} 
  contentContainerStyle={styles.list}
/>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
  flex: 1,
  padding: 10,
  margin: 5,
  elevation: 2,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#fff",
  borderRadius: 10,
  minWidth: "48%",
  maxWidth: "48%",
},
  image: {
    width: 100,
    height: 100,
  },
  textContainer: {
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
  },
  price: {
    color: "#bcbcbc",
    textAlign: "center", 
    marginTop: 5,
    fontSize: 16,
  },
  
  info: { flex: 1 },
  list: { padding: 10 },

});
