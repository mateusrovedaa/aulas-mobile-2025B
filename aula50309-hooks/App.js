import { useState } from "react";
import {
  SafeAreaView,
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
} from "react-native";

export default function App() {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [resultado, setResultado] = useState(0);

  function somar(n1, n2) {
    return n1 + n2;
  }

  function subtrair() {
    const n1 = parseFloat(num1);
    const n2 = parseFloat(num2);
    if (!isNaN(n1) && !isNaN(n2)) {
      setResultado(n1 - n2);
    }
  }

  function multiplicar() {
    const n1 = parseFloat(num1);
    const n2 = parseFloat(num2);
    if (!isNaN(n1) && !isNaN(n2)) {
      setResultado(n1 * n2);
    }
  }

  function dividir() {
    const n1 = parseFloat(num1);
    const n2 = parseFloat(num2);
    if (n2 === 0) {
      setResultado("Erro: Divisão por zero");
      return;
    }
    if (!isNaN(n1) && !isNaN(n2)) {
      setResultado(n1 / n2);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>Calculadora Simples</Text>

      <TextInput
        style={styles.input}
        placeholder="Primeiro número"
        value={num1}
        onChangeText={setNum1}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Segundo número"
        value={num2}
        onChangeText={setNum2}
        keyboardType="numeric"
      />

      <View style={styles.botoesContainer}>
        <Button title=" + " onPress={() => setResultado(somar(parseFloat(num1), parseFloat(num2)))} />
        <Button title=" - " onPress={subtrair} />
        <Button title=" * " onPress={multiplicar} />
        <Button title=" / " onPress={dividir} />
      </View>

      <Text style={styles.resultado}>Resultado: {resultado}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#cccccc",
    borderRadius: 8,
    padding: 12,
    fontSize: 18,
    marginBottom: 10,
  },
  botoesContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 20,
  },
  resultado: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
  },
});