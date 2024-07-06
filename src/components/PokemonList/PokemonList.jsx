import React from 'react'
import './PokemonList.css'
import Pokemon from '../Pokemon/Pokemon'
import usePokemonList from '../../hooks/usePokemonList'

const PokemonList = () => {

    const [pokemonListState, setPokemonListState] = usePokemonList(false)


    return (

        <div className='pokemon-list-wrapper'>
            <div className='pokemon-wrapper'>
                {
                    (pokemonListState.isLoading) ? 'Loading...' :
                        pokemonListState.pokemonList.map((p) => <Pokemon name={p.name} image={p.image} key={p.id} id={p.id} />)
                }
            </div>

            <div className='controls'>
                <button disabled={pokemonListState.prevUrl == null} onClick={() => setPokemonListState( (state) => ({...state, pokedexUrl:pokemonListState.prevUrl}))}>Prev</button>
                <button disabled={pokemonListState.nextUrl == null} onClick={()=>  setPokemonListState( (state) => ({...state, pokedexUrl:pokemonListState.nextUrl}))}>Next</button>
            </div>

        </div>

    )
}

export default PokemonList

// useEffect tyachya state var depend karte 1> [] --> pahilya vedes 2> [x] --> jevha x change hoil 3> [x, y] --> ya don paiki kontahi ek change