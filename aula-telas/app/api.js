import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, FlatList, ActivityIndicator, Button } from "react-native";

export default function PostsScreen() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false); 

  async function load() {
    setLoading(true);                    // começa o carregamento
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    const json = await res.json();
    setData(json);                       // atualiza a lista com os dados recebidos
    setLoading(false);                   // encerra o carregamento
  }

  return (
    <SafeAreaView>
      <Button title="Carregar posts" onPress={load} />

      {loading ? (
        <View>
          <ActivityIndicator />
          <Text>Carregando…</Text>
        </View>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => String(item.id)} // diz ao flatlist qual propriedade usar como ID
          renderItem={({ item }) => (
            <View>
              <Text>- {item.title}</Text>
            </View>
          )}
          ListEmptyComponent={<Text>Nenhum post carregado.</Text>}
        />
      )}
    </SafeAreaView>
  );
}
