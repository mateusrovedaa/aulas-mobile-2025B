import { ScrollView, View, Text, Button, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  return (
    <SafeAreaView style={estilos.areaSegura}>
      <View style={estilos.tela}>
        <View style={estilos.conteudo}>
          <View style={[estilos.cabecalho, { flexDirection: "row", alignItems: "center" }]}>
            <View style={estilos.avatar} />
            <View style={{ marginLeft: 12 }}>
              <Text style={estilos.titulo}>Olá, Estudante</Text>
              <Text style={estilos.subtitulo}>Bem-vindo ao seu painel</Text>
            </View>
          </View>

          <Text style={estilos.rotulo}>Menu</Text>
          <View
            style={[
              estilos.linhaMenu,
              { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
            ]}
          >
            <View style={estilos.containerBotao}>
              <Button title="Notas" color="#2563eb" onPress={() => {}} />
            </View>
            <View style={estilos.containerBotao}>
              <Button title="Aulas" color="#16a34a" onPress={() => {}} />
            </View>
            <View style={estilos.containerBotao}>
              <Button title="Avisos" color="#9333ea" onPress={() => {}} />
            </View>
          </View>

          <Text style={estilos.rotulo}>Próximas atividades</Text>
          <View style={estilos.listaContainer}>
            <ScrollView
              contentContainerStyle={estilos.listaConteudo}
              showsVerticalScrollIndicator={false}
            >
              <View style={estilos.cartao}>
                <Text style={estilos.tituloCartao}>Trabalho de Matemática</Text>
                <Text style={estilos.textoSecundario}>Entrega: 20/08</Text>
              </View>

              <View style={[estilos.cartao, estilos.cartaoImportante]}>
                <Text style={estilos.tituloCartao}>Prova de Física (Importante)</Text>
                <Text style={estilos.textoSecundario}>Data: 22/08</Text>
              </View>

              <View style={estilos.cartao}>
                <Text style={estilos.tituloCartao}>Leitura de História</Text>
                <Text style={estilos.textoSecundario}>Cap. 3 e 4</Text>
              </View>

            </ScrollView>
          </View>

          <Text style={estilos.rotulo}>Chamada para ação</Text>
          <View style={estilos.centralizado}>
            <Text style={{ marginBottom: 8, textAlign: "center" }}>
              Adquira um novo curso e continue aprendendo!
            </Text>
            <Button title="Comprar curso" color="#841584" onPress={() => {}} />
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
    padding: 16 
  },
  cabecalho: { 
    marginBottom: 12 
  },
  avatar: { 
    width: 48, 
    height: 48, 
    borderRadius: 24, 
    backgroundColor: "#e2e8f0" 
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
    marginTop: 16, 
    marginBottom: 8 
  },
  linhaMenu: { 
    marginBottom: 12 
  },
  containerBotao: {
    flex: 1,
    marginHorizontal: 4,
  },
  cartao: {
    width: "100%",
    backgroundColor: "#f1f5f9",
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: "#cbd5e1",
    marginBottom: 12,
  },
  cartaoImportante: {
    backgroundColor: "#dbeafe",
    borderColor: "#60a5fa",
  },
  tituloCartao: { 
    fontWeight: "700", 
    marginBottom: 4 
  },
  textoSecundario: { 
    color: "#475569" 
  },
  centralizado: {
    width: "100%",
    height: 140,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
  },
});
