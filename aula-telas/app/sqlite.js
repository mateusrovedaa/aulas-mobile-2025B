import { View, Text, Button, StyleSheet, FlatList, TextInput } from "react-native";
import { useState } from "react";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { db, initDb } from "../data/db";

initDb();

function getTarefas(){
  return db.getAllSync('SELECT * FROM tarefas');
}

function insertTarefa(nome){
  db.runSync('INSERT INTO tarefas (nome) VALUES (?)', [nome]);
}

function deleteTarefa(id) {
  db.runSync('DELETE FROM tarefas WHERE id = ?', [id]);
}

function getTarefaById(id) {
  const [tarefa] = db.getAllSync('SELECT * FROM tarefas WHERE id = ?', [id]);
  return tarefa;
}

function updateTarefa(id, nome) {
  db.runSync('UPDATE tarefas SET nome = ? WHERE id = ?', [nome, id]);
}

export default function sqlite() {
  const [texto, setTexto] = useState("");
  const [tarefas, setTarefas] = useState([]);
  const [editandoId, setEditandoId] = useState(null);

  function salvarTarefa() {
    const nome = texto.trim();
    if (!nome) return;
    insertTarefa(nome);
    setTexto("");
  }

  function carregarTarefas() {
    setTarefas(getTarefas());
  }

  function excluirTarefa(id) {
    deleteTarefa(id);
    carregarTarefas();
  }

  function editarTarefa(id) {
    const tarefa = getTarefaById(id);
    if (!tarefa) return;
    setTexto(tarefa.nome);
    setEditandoId(id);
  }

  function atualizarTarefa() {
    const nome = texto.trim();
    if (!nome || !editandoId) return;
    updateTarefa(editandoId, nome);
    setTexto("");
    setEditandoId(null);
    carregarTarefas();
  }

  return (
    <SafeAreaView style={estilos.container}>
      <Text style={estilos.titulo}>Tarefas</Text>

      <View style={estilos.linhaEntrada}>
        <TextInput
          value={texto}
          onChangeText={setTexto}
          placeholder="Nova tarefa..."
          style={estilos.campoTexto}
        />
        <Button title="Salvar" onPress={salvarTarefa} disabled={!!editandoId} /> /* converte para boolean */
        <Button title="Atualizar" onPress={atualizarTarefa} disabled={!editandoId} />
      </View>

      <Button title="Carregar tarefas" onPress={carregarTarefas} />

      <FlatList
        data={tarefas}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <View style={estilos.itemLinha}>
            <Text style={estilos.textoItem}>- {item.nome}</Text>
            <View style={estilos.acoesLinha}>
              <Button title="E" onPress={() => editarTarefa(item.id)} />
              <Button title="x" color="#b91c1c" onPress={() => excluirTarefa(item.id)} />
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

