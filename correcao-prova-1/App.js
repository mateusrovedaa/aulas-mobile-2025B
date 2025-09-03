import { View, Text, Button, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  return (
    // SafeAreaView para evitar sobreposição com a barra de status/notch
    <SafeAreaView style={estilos.areaSegura} edges={['top','left','right']}>
      {/* Cabeçalho no topo */}
      <View style={estilos.cabecalho}>
        <Text style={estilos.titulo}>React Native</Text>
        <Text style={estilos.subtitulo}>Avaliação dia 27/08</Text>
      </View>

      {/* Corpo centralizado com flex */}
      <View style={estilos.centro}>
        {/* Retângulo com bordas arredondadas */}
        <View style={estilos.retangulo}>
          <Text style={estilos.textoRetangulo}>Batatas são macias.</Text>
        </View>

        <View style={estilos.espaco} />

        {/* Botão dentro do contêiner centralizado */}
        <Button title="Enviar" onPress={() => {}} />
      </View>
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  areaSegura: {
    flex: 1,
    backgroundColor: "#fff",
  },
  // Cabeçalho alinhado ao topo
  cabecalho: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
  },
  titulo: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 4,
  },
  subtitulo: {
    fontSize: 14,
    color: "#475569",
  },
  // Corpo centralizado com flex
  centro: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  // Retângulo simples com bordas arredondadas
  retangulo: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    backgroundColor: "#e2e8f0",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#cbd5e1",
  },
  textoRetangulo: {
    fontWeight: "600",
  },
  // Espaço entre o retângulo e o botão
  espaco: {
    height: 16,
  },
});
