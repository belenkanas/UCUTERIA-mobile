//Carrito
import { View, Text, Button, TextInput, FlatList } from "react-native";
import { useCart } from "../context/CartContext";
import { useRouter } from "expo-router";

export default function CartScreen() {
  const {
    cart, updateQty, removeFromCart, clearCart,
    coupon, setCoupon, subtotal, discount, tax, shipping, total
  } = useCart();
  const router = useRouter();

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <FlatList
        data={cart}
        keyExtractor={(i) => String(i.id)}
        ListEmptyComponent={<Text>Tu carrito está vacío 🛒</Text>}
        renderItem={({ item }) => (
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginVertical: 5 }}>
            <Text>{item.name} x{item.qty}</Text>
            <View style={{ flexDirection: "row" }}>
              <Button title="-" onPress={() => updateQty(item.id, item.qty - 1)} />
              <Button title="+" onPress={() => updateQty(item.id, item.qty + 1)} />
              <Button title="❌" onPress={() => removeFromCart(item.id)} />
            </View>
          </View>
        )}
      />

      <TextInput
        placeholder="Cupón (DESC10)"
        value={coupon}
        onChangeText={setCoupon}
        style={{ borderWidth: 1, borderColor: "#ccc", padding: 8, marginTop: 10 }}
      />

      <Text>Subtotal: ${subtotal.toFixed(2)}</Text>
      <Text>Descuento: -${discount.toFixed(2)}</Text>
      <Text>IVA: ${tax.toFixed(2)}</Text>
      <Text>Envío: ${shipping}</Text>
      <Text style={{ fontWeight: "bold", fontSize: 18 }}>Total: ${total.toFixed(2)}</Text>

      <Button title="Vaciar carrito" onPress={clearCart} />
      <Button title="Ir al checkout" onPress={() => router.push("/modal")} />
    </View>
  );
}
