'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';

type Pokemon = {
  name: string;
  url: string;
};

export default function HomePKdex() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);

  useEffect(() => {
    async function load() {
      const res = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=10000");
      setPokemon(res.data.results);
    }

    load();
  }, []);

  return (
    <section>
      <h2>Lista de Pokémons</h2>
      <ul>
        {pokemon.map((poke, index) => (
          <li key={index}>{poke.name}</li>
        ))}
      </ul>
    </section>
  );
}
