import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  TextInput,
  Button,
  FlatList,
  Text,
  StyleSheet,
} from "react-native";

export default function App() {
  // Estado para guardar o texto que o usuário está digitando
  const [texto, setTexto] = useState("");
  // Estado para guardar a lista de itens adicionados
  const [lista, setLista] = useState([]);
  // Estado para guardar o ID para usar na lista
  const [proximoId, setProximoId] = useState(1);

  // Função chamada quando o botão "Adicionar" é pressionado
  function handleAdicionarItem() {
    // cria o novo item com id sequencial
    const novoItem = { id: proximoId, value: texto };

    // adiciona ao final da lista
    const listaAtualizada = lista.concat(novoItem);
    setLista(listaAtualizada);

    // prepara o próximo id
    setProximoId(proximoId + 1);

    // limpa o campo
    setTexto("");
  }


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Digite um item..."
          value={texto}
          onChangeText={setTexto} // atualiza o estado texto a cada letra digitada
        />
        <Button title="Adicionar" onPress={handleAdicionarItem} />
      </View>

      {/* lista que mostra os itens adicionados */}
      <FlatList
        data={lista}
        renderItem={({ item }) => (
          <Text>{item.value}</Text>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  inputContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#cccccc",
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },
});