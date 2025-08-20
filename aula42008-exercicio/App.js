import { ScrollView, View, Text, Button, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  return (
    <SafeAreaView style={estilos.areaSegura}>
      <View style={estilos.tela}>
        <View style={estilos.conteudo}>
          <View style={estilos.cabecalho}>
            <Text style={estilos.titulo}>Quadro de Tarefas</Text>
            <Text style={estilos.subtitulo}>Kanban estático</Text>
          </View>

          <Text style={estilos.rotulo}>Quadro</Text>
          <ScrollView
            horizontal
            style={estilos.quadro}
            contentContainerStyle={estilos.quadroConteudo}
            showsHorizontalScrollIndicator={false}
          >
            <View style={estilos.coluna}>
              <Text style={estilos.tituloColuna}>A Fazer</Text>
              <View style={estilos.cartao}>
                <Text style={estilos.textoCartao}>Configurar ambiente</Text>
              </View>
              <View style={[estilos.cartao, estilos.cartaoImportante]}>
                <Text style={estilos.textoCartao}>Entregar layout (Importante)</Text>
              </View>
              <View style={estilos.cartao}>
                <Text style={estilos.textoCartao}>Revisar textos</Text>
              </View>
            </View>

            <View style={estilos.coluna}>
              <Text style={estilos.tituloColuna}>Em Progresso</Text>
              <View style={estilos.cartao}>
                <Text style={estilos.textoCartao}>Tela inicial</Text>
              </View>
              <View style={estilos.cartao}>
                <Text style={estilos.textoCartao}>API de login</Text>
              </View>
              <View style={estilos.cartao}>
                <Text style={estilos.textoCartao}>Documento</Text>
              </View>
            </View>

            <View style={estilos.coluna}>
              <Text style={estilos.tituloColuna}>Concluído</Text>
              <View style={estilos.cartao}>
                <Text style={estilos.textoCartao}>Setup projeto</Text>
              </View>
              <View style={estilos.cartao}>
                <Text style={estilos.textoCartao}>Componentes base</Text>
              </View>
              <View style={estilos.cartao}>
                <Text style={estilos.textoCartao}>README</Text>
              </View>
            </View>
          </ScrollView>

          <View style={[estilos.rodape, { flexDirection: "row" }]}>
            <View style={estilos.containerBotao}>
              <Button title="Adicionar" color="#2563eb" onPress={() => {}} />
            </View>
            <View style={estilos.containerBotao}>
              <Button title="Filtrar" color="#64748b" onPress={() => {}} />
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  areaSegura: { 
    flex: 1, 
    backgroundColor: "#fff" 
  },
  tela: { 
    flex: 1, 
    backgroundColor: "#fff" 
  },
  conteudo: { 
    flex: 1, 
    padding: 16 
  },
  cabecalho: { 
    marginBottom: 12 
  },
  titulo: { 
    fontSize: 20, 
    fontWeight: "700" 
  },
  subtitulo: { 
    color: "#475569" 
  },
  rotulo: { 
    fontWeight: "700", 
    marginTop: 8, 
    marginBottom: 8 
  },
  quadro: { 
    marginBottom: 12 
  },
  quadroConteudo: { 
    paddingRight: 8 
  },
  coluna: {
    width: 260,
    backgroundColor: "#f8fafc",
    borderWidth: 1, borderColor: "#e5e7eb",
    borderRadius: 10,
    padding: 8,
    marginRight: 12,
  },
  tituloColuna: { 
    fontWeight: "700", 
    marginBottom: 8, 
    textAlign: "center" },
  cartao: {
    backgroundColor: "#fff",
    borderWidth: 1, borderColor: "#e5e7eb",
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
  },
  cartaoImportante: { 
    backgroundColor: "#dbeafe", 
    borderColor: "#60a5fa" },
  textoCartao: { 
    fontWeight: "600" 
  },
  rodape: { 
    marginTop: 8 
  },
  containerBotao: { 
    flex: 1, 
    marginHorizontal: 4 
  },
});