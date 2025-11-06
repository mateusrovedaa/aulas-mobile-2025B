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

async function getItemById(id){
    const resposta = await fetch(`http://177.44.248.50:8080/items/${id}`);
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

async function edita(id, name, description, price){
    const resposta = await fetch(`http://177.44.248.50:8080/items/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, description, price }),
    });
    return resposta.ok;
}

async function apaga(id){
    const resposta = await fetch(`http://177.44.248.50:8080/items/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    return resposta.ok;
}

export default function Items() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [items, setItems] = useState([]);
  const [editingId, setEditingId] = useState(null);

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

  async function atualizar(){
    if (!editingId) return;
    const ok = await edita(editingId, name, description, Number(price));
    if (ok) {
      setName("");
      setDescription("");
      setPrice("");
      setEditingId(null);
      await carregarItems();
    }
  }

  async function editarTarefa(id){
    const item = await getItemById(id);
    if (!item) return;
    setName(item.name);
    setDescription(item.description);
    setPrice(String(item.price));
    setEditingId(id);
  }

  async function excluir(id){
    const ok = await apaga(id);
    if (ok) await carregarItems();
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

      <View style={estilos.linhaEntrada}>
        <Button title="Salvar" onPress={salvar} disabled={!!editingId} />
        <Button title="Atualizar" onPress={atualizar} disabled={!editingId} />
      </View>
      <View style={{ height: 8 }} />

      <Button title="Recarregar lista" onPress={carregarItems} />

      <FlatList
        data={items}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <View style={estilos.item}>
            <View style={estilos.itemHeader}>
              <Text style={estilos.itemTitulo}>{item.name}</Text>
              <View style={estilos.acoesLinha}>
                <Button title="E" onPress={() => editarTarefa(item.id)} />
                <Button title="x" color="#b91c1c" onPress={() => excluir(item.id)} />
              </View>
            </View>
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
  linhaEntrada: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8
  },
  item: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginHorizontal: 0,
    marginBottom: 10
  },
  itemHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 4
  },
  itemTitulo: {
    fontWeight: "bold",
    marginBottom: 4
  },
  acoesLinha: {
    flexDirection: "row",
    gap: 4
  }
});
