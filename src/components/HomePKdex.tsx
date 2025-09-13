'use client';

/* bibliotecas */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './components/Header';
import Footer from './components/Footer';

//declaração váriaveis dos pokémon
type Pokemon = {
  name: string;
  url: string;
};

//componente principal,para manter os pokemon salvos
export default function HomePKdex() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);

  useEffect(() => {
    async function load() {
      const res = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=10000");
      setPokemon(res.data.results);
    }

    load();
  }, []);

  //página
  return (
    <>
      <Header /> 
      <main>
        <h2>Lista de Pokémons</h2>
        <ul>
          {pokemon.map((poke, index) => (
            <li key={index}>{poke.name}</li>
          ))}
        </ul>
      </main>
      <Footer />
    </>
  );
}
