import React, { useEffect, useState } from "react";
import { View, Text, Button, FlatList, TouchableOpacity } from "react-native";
import { api } from "../api/api";

type Pokemon = {
  id: string;
  nome: string;
  tipo: string;
  nivel: number;
};

export default function HomeScreen({ navigation }: any) {
  const [lista, setLista] = useState<Pokemon[]>([]);

  async function carregarPokemons() {
    const response = await api.get("/");
    setLista(response.data);
  }

  async function excluir(id: string) {
    await api.delete(`/${id}`);
    carregarPokemons();
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", carregarPokemons);
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Button title="Adicionar Pokémon" onPress={() => navigation.navigate("Form")} />

      <FlatList
        data={lista}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("Form", { pokemon: item })}
          >
            <View
              style={{
                backgroundColor: "#eee",
                padding: 10,
                marginVertical: 6,
                borderRadius: 6,
              }}
            >
              <Text>{item.nome} - {item.tipo}</Text>
              <Text>Nível: {item.nivel}</Text>

              <Button title="Excluir" onPress={() => excluir(item.id)} />
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
