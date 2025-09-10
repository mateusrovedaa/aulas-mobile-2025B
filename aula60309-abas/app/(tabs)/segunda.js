import { View, Text, Button } from "react-native";
import { Link, router } from "expo-router";

export default function Segunda() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center", gap: 12 }}>
      <Text style={{ fontSize: 18 }}>Segunda tela</Text>

      <Button title="Voltar" onPress={() => router.back()} />
        <Link href="/" asChild>
          <Button title="Voltar ao início"/>
        </Link>
    </View>
  );
}
