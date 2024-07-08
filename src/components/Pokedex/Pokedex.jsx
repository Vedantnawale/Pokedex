import React, { useEffect, useState } from 'react'
import Search from '../Search/Search'
import './Pokedex.css'
import PokemonList from '../PokemonList/PokemonList'
import PokemonDetails from '../PokemonDetails/PokemonDetails'

const Pokedex = () => {

  const [serachTerm, setSearchTerm] = useState('')

  return (
    <div className='pokedex-wrapper'>
       
        <Search updateSearchTerm = {setSearchTerm} />
        { (!serachTerm) ? <PokemonList /> : <PokemonDetails key={serachTerm} pokemonName={serachTerm} />}
    </div>
  )
}

export default Pokedex