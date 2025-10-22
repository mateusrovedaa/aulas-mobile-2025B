import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, FlatList, ActivityIndicator, Button, TextInput, Pressable, Alert } from "react-native";

export default function PostsScreen() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [selectedId, setSelectedId] = useState(null);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  async function load() {
    setLoading(true);
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    const json = await res.json();
    setData(json);
    setLoading(false);
  }

  async function createPost() {
    setLoading(true);
    const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, body, userId: 1 }),
    });
    const created = await res.json();
    if (created) {
     await load();
     setSelectedId(created.id || null);
    } else {
      Alert.alert("Falha no POST", `Status: ${res.status}`);
    }
    setLoading(false);
  }

  async function updatePost() {
    if (!selectedId) return;
    setLoading(true);
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${selectedId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: selectedId, title, body, userId: 1 }),
    });
    if (res.ok) {
     await load();
    } else {
      Alert.alert("Falha no PUT", `Status: ${res.status}`);
    }
    setLoading(false);
  }

  async function deletePost() {
    if (!selectedId) return;
    setLoading(true);
    await fetch(`https://jsonplaceholder.typicode.com/posts/${selectedId}`, {
      method: "DELETE",
    });
    await load();
    setSelectedId(null);
    setTitle("");
    setBody("");
    setLoading(false);
  }

  return (
    <SafeAreaView>
      <Button title="Carregar posts (GET)" onPress={load} />

      <View>
        <Text>ID selecionado: {selectedId ?? "-"}</Text>

        <Text>Título</Text>
        <TextInput value={title} onChangeText={setTitle} />

        <Text>Corpo</Text>
        <TextInput value={body} onChangeText={setBody} multiline />

        <Button title="Criar (POST)" onPress={createPost} />
        <Button title="Atualizar (PUT)" onPress={updatePost} />
        <Button title="Excluir (DELETE)" onPress={deletePost} />
      </View>

      {loading ? (
        <View>
          <ActivityIndicator />
          <Text>Carregando…</Text>
        </View>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
          <Pressable
            onPress={() => {
              setSelectedId(item.id);
              setTitle(item.title);
              setBody(item.body);
            }}
          >
            <View>
              <Text>- {item.id} | {item.title}</Text>
            </View>
          </Pressable>
          )}
          ListEmptyComponent={<Text>Nenhum post carregado.</Text>}
        />
      )}
    </SafeAreaView>
  );
}
