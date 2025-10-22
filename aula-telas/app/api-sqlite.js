import { View, Text, Button, StyleSheet, FlatList, TextInput } from "react-native";
import { useState, useEffect } from "react";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const BASE_URL = "https://jsonplaceholder.typicode.com";

async function getPosts() {
  const res = await fetch(`${BASE_URL}/posts`);
  return res.json();
}

async function createPost(title) {
  await fetch(`${BASE_URL}/posts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, body: "", userId: 1 }),
  });
}

async function deletePost(id) {
  await fetch(`${BASE_URL}/posts/${id}`, { method: "DELETE" });
}

async function getPostById(id) {
  const res = await fetch(`${BASE_URL}/posts/${id}`);
  return res.json()
}

async function updatePost(id, title) {
  await fetch(`${BASE_URL}/posts/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, title, body: "", userId: 1 }),
  });
}

export default function postsScreen() {
  const [texto, setTexto] = useState("");
  const [posts, setPosts] = useState([]);
  const [editandoId, setEditandoId] = useState(null);

  async function salvarPost() {
    const title = texto.trim();
    if (!title) return;
    await createPost(title);
    setTexto("");
    await carregarPosts();
  }

  async function carregarPosts() {
    const lista = await getPosts();
    setPosts(lista);
  }

  async function excluirPost(id) {
    await deletePost(id);
    await carregarPosts();
  }

  async function editarPost(id) {
    const post = await getPostById(id);
    if (!post) return;
    setTexto(post.title);
    setEditandoId(id);
  }

  async function atualizarPost() {
    const title = texto.trim();
    if (!title || !editandoId) return;
    await updatePost(editandoId, title);
    setTexto("");
    setEditandoId(null);
    await carregarPosts();
  }

  useEffect(() => {
    carregarPosts();
  }, []);

  return (
    <SafeAreaView style={estilos.container}>
      <Text style={estilos.titulo}>Posts</Text>

      <View style={estilos.linhaEntrada}>
        <TextInput
          value={texto}
          onChangeText={setTexto}
          placeholder="Novo post (title)..."
          style={estilos.campoTexto}
        />
        <Button title="Salvar" onPress={salvarPost} disabled={!!editandoId} />
        <Button title="Atualizar" onPress={atualizarPost} disabled={!editandoId} />
      </View>

      <Button title="Carregar posts" onPress={carregarPosts} />

      <FlatList
        data={posts}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <View style={estilos.itemLinha}>
            <Text
              style={[estilos.textoItem, { flexShrink: 1 }]}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              - {item.title}
            </Text>

            <View style={estilos.acoesLinha}>
              <Button title="E" onPress={() => editarPost(item.id)} />
              <Button title="x" color="#b91c1c" onPress={() => excluirPost(item.id)} />
            </View>
          </View>
        )}
      />
    
      <View style={estilos.rodape}>
        <Button title="Voltar" onPress={() => router.back()} />
        <Button title="Início" onPress={() => router.replace("/")} />
      </View>
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 16 
  },
  titulo: { 
    fontSize: 18, 
    fontWeight: "600", 
    marginBottom: 8 
  },
  linhaEntrada: { 
    flexDirection: "row", 
    alignItems: "center", 
    marginBottom: 8, 
    gap: 8 
  },
  campoTexto: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 44,
  },
  textoItem: { 
    fontSize: 16, 
    paddingVertical: 6 
  },
  itemLinha: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 4,
  },
  acoesLinha: {
    flexDirection: "row",
    gap: 4,
  },
  rodape: { 
    flexDirection: "row", 
    gap: 8, 
    marginTop: 8 
  },
});
