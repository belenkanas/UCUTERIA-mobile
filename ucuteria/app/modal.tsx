//Checkout modal
import { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { useRouter } from "expo-router";
import { useCart } from "./context/CartContext";
import { Picker } from "@react-native-picker/picker";

export default function CheckoutModal() {
  const router = useRouter();
  const { clearCart } = useCart();
  const [form, setForm] = useState({
    name: "", email: "", phone: "", address: "", payment: "",
  });

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.phone || !form.address) {
      Alert.alert("Error", "Completa todos los campos.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(form.email)) {
      Alert.alert("Error", "Email inválido.");
      return;
    }
    if (isNaN(Number(form.phone))) {
      Alert.alert("Error", "Teléfono debe ser numérico.");
      return;
    }
    Alert.alert("¡Pedido confirmado!", "Gracias por tu compra ☕", [
      { text: "OK", onPress: () => { clearCart(); router.replace("/(tabs)"); } },
    ]);
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text>Nombre</Text>
      <TextInput style={{ borderWidth: 1, marginBottom: 8 }} value={form.name} onChangeText={(v) => setForm({ ...form, name: v })} />
      <Text>Email</Text>
      <TextInput style={{ borderWidth: 1, marginBottom: 8 }} value={form.email} onChangeText={(v) => setForm({ ...form, email: v })} />
      <Text>Teléfono</Text>
      <TextInput style={{ borderWidth: 1, marginBottom: 8 }} value={form.phone} onChangeText={(v) => setForm({ ...form, phone: v })} />
      <Text>Dirección</Text>
      <TextInput style={{ borderWidth: 1, marginBottom: 8 }} value={form.address} onChangeText={(v) => setForm({ ...form, address: v })} />
      <Text>Método de pago</Text>
      <View style={{ borderWidth: 1, borderColor: "#ccc", marginBottom: 12, borderRadius: 5 }}>
        <Picker
          selectedValue={form.payment}
          onValueChange={(itemValue) => setForm({ ...form, payment: itemValue })}
        >
          <Picker.Item label="Seleccionar método..." value="" />
          <Picker.Item label="Tarjeta" value="Tarjeta" />
          <Picker.Item label="Efectivo" value="Efectivo" />
          <Picker.Item label="Transferencia" value="Transferencia" />
        </Picker>
      </View>
      <Button title="Confirmar pedido" onPress={handleSubmit} />
    </View>
  );
}

