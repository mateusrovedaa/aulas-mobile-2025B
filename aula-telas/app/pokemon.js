import { SafeAreaView } from "react-native-safe-area-context";
import { Button, StyleSheet, Text, TextInput, Image } from "react-native";
import { useState, useEffect } from "react";

async function getPokemon(pokemon){
    const resposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if (resposta.ok) {
        const payload = await resposta.json();
        return payload;
    }
    return null;
}

async function cadastra(name, description, price){
    const resposta = await fetch("http://177.44.248.50:8080/items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, description, price }),
    });
    console.log(resposta);
}

getPokemon();

export default function Pokemon() {
    const [pokemon, setPokemon] = useState('');
    const [pokemonImage, setPokemonImage] = useState(null);
    const [pokemonPesquisar, setPokemonPesquisar] = useState('');

    async function carregarPokemon(){
        const poke = await getPokemon(pokemonPesquisar);
        setPokemon(poke.forms?.[0]?.name || 'Pokemon não encontrado')
        setPokemonImage(poke.sprites?.front_default || null);
    }

    async function salvar(){
        const nome = "Garrafinha";
        const preco = 60;
        const descricao = "Algo para colocar líquidos";
        cadastra(nome, descricao, preco);
        console.log(JSON.stringify({ nome, descricao, preco }))
    }

    // useEffect(() => {
    //     carregarPokemon();
    //   }, []);

    return (
        <SafeAreaView style={estilos.container}>
            <TextInput
                value={pokemonPesquisar}
                onChangeText={setPokemonPesquisar}
            />
            <Button title="Pesquisar" onPress={carregarPokemon}/>
            <Button title="Salvar" onPress={salvar}/>
            <Text>{pokemon}</Text>
            <Image
                source={{ uri: pokemonImage }}
                style={{ width: 400, height: 400 }}
            />
        </SafeAreaView>
    );
}

const estilos = StyleSheet.create({
    container: {
        flex: 1
    }
});