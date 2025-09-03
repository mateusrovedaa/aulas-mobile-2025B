// importações
import { useState } from "react";
import { TextInput, Text, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  // variável de estado chamada "n", que começa em 0
  // "setN" é a função para atualizar esse valor
  const [n, setN] = useState(0);

  // exemplo 2
  const [nome, setNome] = useState("");

  return (
    <SafeAreaView style={{ padding: 16 }}>
      <Text style={{ fontSize: 24, marginBottom: 8 }}>Valor: {n}</Text>
      {/* Botão que, ao ser pressionado, chama uma Arrow Function para somar 1 */}
      <Button title="Somar +1" onPress={() => setN(n + 1)} />
      
      {/* Exemplo 2 */}
      <Text style={{ marginBottom: 8 }}>Como você se chama?</Text>
      <TextInput
        value={nome}
        onChangeText={setNome}
        placeholder="Digite seu nome"
        style={{
          borderWidth: 1, borderColor: "#ccc", borderRadius: 8,
          padding: 10, marginBottom: 8
        }}
      />
      <Text>Olá, {nome || "visitante"}!</Text>
    </SafeAreaView>
  );
}