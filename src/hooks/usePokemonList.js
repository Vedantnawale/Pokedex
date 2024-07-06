import axios from "axios";
import { useEffect, useState } from "react";

function usePokemonList() {

    // const [pokemonList, setPokemonList] = useState([]);
    // const [isLoading, setIsLoading] = useState(true);

    // const [pokedexUrl, setPokedexUrl] = useState('https://pokeapi.co/api/v2/pokemon/')

    // const [nextUrl, setNextUrl] = useState('');
    // const [prevUrl, setPrevUrl] = useState('')

    const [pokemonListState, setPokemonListState] = useState({
        pokemonList: [],
        isLoading: true,
        pokedexUrl: 'https://pokeapi.co/api/v2/pokemon/',
        nextUrl: '',
        prevUrl: '',
        type: ''
    })

    async function downloadPokemons() {

        if (pokemonListState.type) {
            const response = await axios.get(`https://pokeapi.co/api/v2/type/${pokemonListState.type}`); // this downloads list of 20 pokemons
            setPokemonListState((state) => ({
                ...state,
                pokemonList: response.data.pokemon
            }));
        } else {

             // setIsLoading(true)
        setPokemonListState((state) => ({ ...state, isLoading: true }))

        const response = await axios.get(pokemonListState.pokedexUrl); // this downloads list of 20 pokemons
        console.log(response);

        const pokemonResults = response.data.results; // we get the array of pokemons from result
        console.log(pokemonResults);

        // setNextUrl(response.data.next)
        // setPrevUrl(response.data.previous)

        setPokemonListState((state) => ({
            ...state,
            nextUrl: response.data.next,
            prevUrl: response.data.previous
        }));

            // iterating over the array of pokemons, and using their url, to create an array of promises
            // that will download those 20 pokemons
            const pokemonResultPromise = pokemonResults.map((pokemon) => axios.get(pokemon.url));

            console.log(pokemonResultPromise);

            // passing that promise array to axios.all
            const pokemonData = await axios.all(pokemonResultPromise); // array of 20 pokemon detailed data 
            // console.log(pokemonData);

            // now iterate on the data of each pokemon, and extract id, name, image, types
            const pokeListResult = pokemonData.map((pokeData) => {
                const pokemon = pokeData.data
                return {
                    id: pokemon.id,
                    name: pokemon.name,
                    image: (pokemon.sprites.other) ? pokemon.sprites.other.dream_world.front_default : pokemon.sprites.front_shiny,
                    types: pokemon.types
                }

            })
            // console.log(pokeListResult);
            // setPokemonList(pokeListResult)
            // setPokemonListState({
            //     ...pokemonListState, 
            //     pokemonList: pokeListResult, 
            //     isLoading: false})

            setPokemonListState((state) => ({
                ...state,
                pokemonList: pokeListResult,
                isLoading: false
            }))

        }

        // jar ek peksha jast vela set state use hot asnar tr normal set upadation sodun finction updation use karayach with state value
    }


    useEffect(() => {
        setPokemonListState({ ...pokemonListState, isLoading: true })
        downloadPokemons();
    }, [pokemonListState.pokedexUrl])

    return [pokemonListState, setPokemonListState]
}

export default usePokemonList