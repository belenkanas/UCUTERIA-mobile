//Home (lista de productos)
import { useState } from "react";
import { View, Text, TextInput, FlatList, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import data from "../database/db.json";

export default function HomeScreen() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const router = useRouter();

  const products = data.products.filter((p) => {
    const matchesCategory = category ? p.category === category : true;
    const matchesQuery =
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.desc.toLowerCase().includes(query.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  const categories = [...new Set(data.products.map((p) => p.category))];

  return (
    <View style={{ padding: 10, flex: 1 }}>
      <TextInput
        placeholder="Buscar..."
        value={query}
        onChangeText={setQuery}
        style={{ borderWidth: 1, borderColor: "#ccc", padding: 8, marginBottom: 10 }}
      />
      <View style={{ flexDirection: "row", flexWrap: "wrap", marginBottom: 10 }}>
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat}
            onPress={() => setCategory(category === cat ? "" : cat)}
            style={{
              backgroundColor: category === cat ? "#6c5ce7" : "#dfe6e9",
              padding: 8,
              borderRadius: 10,
              margin: 4,
            }}
          >
            <Text style={{ color: category === cat ? "white" : "black" }}>{cat}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => router.push(`/product/${item.id}`)}
            style={{
              padding: 15,
              marginBottom: 8,
              backgroundColor: "#fff",
              borderRadius: 12,
              elevation: 2,
            }}
          >
            <Text style={{ fontSize: 24 }}>{item.img} {item.name}</Text>
            <Text>{item.category}</Text>
            <Text>${item.price}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
