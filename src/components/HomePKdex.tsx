'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';

type Pokemon = {
  name: string
  url: string
};

//componente principal, função para puxar e armazenar os pokémon
export default function HomePKdex() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([])

  useEffect(() => {
    async function load() {
      const res = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=151")
      setPokemon(res.data.results);
    }

    load();
  }, [])

  //função auxiliar para ajudar a pegar o ID do URL da API
  const getPokeID = (url: string) => {
    const parts = url.split('/')
    return parts[parts.length - 2] //puxa o penúltimo item
  }

  return (
    <section>
      <h2 className="text-2xl font-bold mb-4 text-center">Lista de Pokémons</h2>
      
       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {pokemon.map((poke) =>{
          const id = getPokeID(poke.url)
          const pokeImage = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${id}.gif` 
          
          return (
            <div key={poke.name}>
              <img
                src={pokeImage} 
                alt={poke.name}
                />
              <p>
                #{id} - {poke.name}
              </p>
            </div>
          )
        })} 
       </div>
    </section>
  );
}
