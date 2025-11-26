import React, { useState } from "react";
import { View, TextInput, Button } from "react-native";
import { api } from "../api/api";

export default function FormScreen({ route, navigation }: any) {
  const pokemon = route.params?.pokemon;
  
  const [nome, setNome] = useState(pokemon?.nome || "");
  const [tipo, setTipo] = useState(pokemon?.tipo || "");
  const [nivel, setNivel] = useState(String(pokemon?.nivel || ""));

  async function salvar() {
    if (pokemon) {
      await api.put(`/${pokemon.id}`, { nome, tipo, nivel: Number(nivel) });
    } else {
      await api.post("/", { nome, tipo, nivel: Number(nivel) });
    }
    navigation.goBack();
  }

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <TextInput placeholder="Nome" value={nome} onChangeText={setNome} />
      <TextInput placeholder="Tipo" value={tipo} onChangeText={setTipo} />
      <TextInput placeholder="Nível" value={nivel} onChangeText={setNivel} keyboardType="numeric" />

      <Button title="Salvar" onPress={salvar} />
    </View>
  );
}
