import { SafeAreaView } from "react-native-safe-area-context";
import { Button, StyleSheet, Text, TextInput, FlatList, View } from "react-native";
import { useState, useEffect } from "react";

async function getItems(){
    const resposta = await fetch(`http://177.44.248.50:8080/items`);
    if (resposta.ok) {
      const payload = await resposta.json();
      return payload;
    }
}

async function cadastra(name, description, price){
    const resposta = await fetch(`http://177.44.248.50:8080/items`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, description, price }),
    });
    return resposta.ok;
}

export default function Items() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [items, setItems] = useState([]);

  async function carregarItems(){
    const lista = await getItems();
    setItems(lista);
  }

  async function salvar(){
    const ok = await cadastra(name, description, Number(price));
    if (ok) {
      setName("");
      setDescription("");
      setPrice("");
      await carregarItems();
    }
  }

  useEffect(() => {
    carregarItems();
  }, []);

  return (
    <SafeAreaView style={estilos.container}>
      <TextInput
        placeholder="Nome"
        value={name}
        onChangeText={setName}
        style={estilos.input}
      />
      <TextInput
        placeholder="Descrição"
        value={description}
        onChangeText={setDescription}
        style={estilos.input}
      />
      <TextInput
        placeholder="Preço"
        keyboardType="numeric"
        value={price}
        onChangeText={setPrice}
        style={estilos.input}
      />

      <Button title="Salvar" onPress={salvar} />
      <View style={{ height: 8 }} />

      <Button title="Recarregar lista" onPress={carregarItems} />

      <FlatList
        data={items}
        renderItem={({ item }) => (
          <View style={estilos.item}>
            <Text style={estilos.itemTitulo}>{item.name}</Text>
            <Text>{item.description}</Text>
            <Text>Preço: {String(item.price)}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 8
  },
  item: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginHorizontal: 0,
    marginBottom: 10
  },
  itemTitulo: {
    fontWeight: "bold",
    marginBottom: 4
  }
});
