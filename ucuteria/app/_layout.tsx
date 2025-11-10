import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { CartProvider } from './context/CartContext';
export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  return (
    <CartProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="product/[id]" options={{ title: "Producto" }} />
        <Stack.Screen
          name="modal"
          options={{ presentation: "modal", title: "Checkout" }}
        />
      </Stack>
      <StatusBar style="auto" />
    </CartProvider>
  );
}


