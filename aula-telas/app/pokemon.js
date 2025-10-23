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