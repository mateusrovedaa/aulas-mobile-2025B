import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, FlatList, ActivityIndicator, Button, TextInput, Pressable, Alert, StyleSheet } from "react-native";

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
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Posts (JSONPlaceholder)</Text>

      <Button title="Carregar posts (GET)" onPress={load} />

      <Text style={{ marginTop: 8 }}>ID selecionado: {selectedId ?? "-"}</Text>

      <Text style={{ marginTop: 8 }}>Título</Text>
      <TextInput
        value={title}
        onChangeText={setTitle}
        style={styles.input}
        placeholder="Digite o título"
      />

      <Text style={{ marginTop: 8 }}>Corpo</Text>
      <TextInput
        value={body}
        onChangeText={setBody}
        style={[styles.input, { minHeight: 64, textAlignVertical: "top" }]}
        placeholder="Digite o corpo"
        multiline
      />

      <View style={styles.buttonRow}>
        <View style={{ flex: 1, marginRight: 6 }}>
          <Button title="Criar (POST)" onPress={createPost} disabled={loading} />
        </View>
        <View style={{ flex: 1, marginLeft: 6 }}>
          <Button title="Atualizar (PUT)" onPress={updatePost} disabled={loading || !selectedId} />
        </View>
      </View>

      <View style={{ marginTop: 12 }}>
        <Button title="Excluir (DELETE)" onPress={deletePost} disabled={loading || !selectedId} />
      </View>

      {loading ? (
        <View style={{ alignItems: "center", marginVertical: 16 }}>
          <ActivityIndicator />
          <Text style={{ marginTop: 8 }}>Carregando…</Text>
        </View>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => String(item.id)}
          ListEmptyComponent={<Text>Nenhum post carregado.</Text>}
          renderItem={({ item }) => {
            const isSelected = item.id === selectedId;
            return (
              <Pressable
                onPress={() => {
                  setSelectedId(item.id);
                  setTitle(item.title);
                  setBody(item.body);
                }}
                style={[styles.item, isSelected && styles.itemSelected]}
              >
                <Text style={{ fontWeight: "700" }}>
                  {item.id}. {item.title}
                </Text>
                <Text style={{ color: "#555" }}>{item.body}</Text>
              </Pressable>
            );
          }}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#fff", 
    padding: 16 
  },
  header: { 
    fontSize: 18, 
    fontWeight: "700", 
    marginBottom: 8 
  },
  input: { 
    borderWidth: 1, 
    borderColor: "#ddd", 
    padding: 8, 
    borderRadius: 6 
  },
  buttonRow: { 
    flexDirection: "row", 
    marginTop: 12 
  },
  item: { 
    paddingVertical: 10 
  },
  itemSelected: { 
    backgroundColor: "#eef" 
  },
});
