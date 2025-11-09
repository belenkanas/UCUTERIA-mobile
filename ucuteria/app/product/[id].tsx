//Detalle del producto
import { View, Text, Button } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import data from "../database/db.json";
import { useCart } from "../context/CartContext";

export default function ProductDetail() {
  const { id } = useLocalSearchParams();
  const { addToCart } = useCart();
  const router = useRouter();
  const product = data.products.find((p) => p.id === id);

  if (!product) return <Text>Producto no encontrado</Text>;

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 60 }}>{product.img}</Text>
      <Text style={{ fontSize: 28, fontWeight: "bold" }}>{product.name}</Text>
      <Text>{product.desc}</Text>
      <Text style={{ marginVertical: 10, fontSize: 20 }}>${product.price}</Text>
      <Button title="Agregar al carrito" onPress={() => { addToCart({ ...product, qty: 1 }); router.back(); }} />
    </View>
  );
}
