  import { View, Text, StyleSheet, Button, ScrollView } from "react-native";
  import { SafeAreaView } from "react-native-safe-area-context";

  export default function App() {
    return (
      <SafeAreaView style={estilos.areaSegura}>
        <View style={estilos.cabecalho}>
          <View style={estilos.avatar}>
          </View>
          <View>
            <Text style={estilos.titulo}>Olá, estudante!</Text>
            <Text>Batata</Text>
          </View>
        </View>
        <View style={estilos.nav}>
          <Text style={estilos.negrito}>Menu</Text>
          <View style={estilos.menu}>
            <Button color="#000" title="Butão 1"></Button>
            <Button color="#5af" title="Butão 2"></Button>
            <Button color="#4EA" title="Butão 3"></Button>
          </View>
        </View>
        <Text style={estilos.negrito}>Próximas atividades</Text>
        <ScrollView style={estilos.lista}>
          <View style={estilos.cartoes}>
            <Text style={[estilos.negrito, {fontSize: 15}]}>Card 1</Text>
            <Text>Card 1</Text>
          </View>
          <View style={estilos.cartoes}>
            <Text style={[estilos.negrito, {fontSize: 15}]}>Card 1</Text>
            <Text>Card 1</Text>
          </View>
          <View style={estilos.cartoes}>
            <Text style={[estilos.negrito, {fontSize: 15}]}>Card 1</Text>
            <Text>Card 1</Text>
          </View>
        </ScrollView>
        <Text style={estilos.negrito}>Chamada para ação</Text>
        <View style={estilos.chamadaAcao}>
          <Text>Compre o curso</Text>
          <Button title="Comprar"></Button>
        </View>
      </SafeAreaView>
    );
  }

  const estilos = StyleSheet.create({
    areaSegura: {
      margin: 20
    },
    avatar: {
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: "#3c3c3c"
    },
    cabecalho: {
      marginTop: 15,
      flexDirection: "row",
      marginLeft: 12,
      gap: 15,
      alignItems: "center"
    },
    titulo: {
      fontWeight: "bold",
      fontSize: 25
    },
    menu: {
      flexDirection: "row",
      justifyContent: "space-evenly"
    },
    negrito: {
      fontWeight: "bold"
    },
    nav: {
      gap: 10
    },
    cartoes: {
      justifyContent: "center",
      height: 80,
      borderRadius: 20,
      backgroundColor: "#f1b1b1ff",
      marginBottom: 10,
      padding: 20
    },
    lista: {
      height: 300
    },
    chamadaAcao: {
      borderColor: "#000",
      borderWidth: 1,
      borderRadius: 20,
      alignItems: "center",
      justifyContent: "center",
      height: 100
    }
  });