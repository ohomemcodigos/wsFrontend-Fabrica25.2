'use client'; // deixa em modo usuário, para rodar no navegador

/* bibliotecas */
import React, { useEffect, useState } from 'react';
import axios from 'axios';

/* componentes */
import PokemonCard from '../components/PokemonCard';
import SearchBar from '../components/SearchBar';

// tipagem de dados que serão armazenados dos Pokémon
type Pokemon = {
  id: number; // número na Pokédex
  name: string; // nome do Pokémon
  image: string; // sprite do Pokémon
  shinyImage: string; // sprite do Pokémon em sua versão shiny
  types: string[]; // lista dos tipos
};

// componente principal, renderiza a a Pokédex
export default function HomePKdex() {
  // estado que guarda quais pokémon estão carregados
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  // estado que guarda quais pokémon estão como shiny 
  const [shinySet, setShinySet] = useState<Set<number>>(new Set());
    const [search, setSearch] = useState(""); // estado da pesquisa dos nomes

  // puxa os Pokémon da API
  useEffect(() => {
    async function load() {
      try {
        const res = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=151");

        const detailedPokemons = await Promise.all(
          res.data.results.map(async (poke: { name: string; url: string }) => {
            const details = await axios.get(poke.url);

            // tipagem correta do array de types
            type PokemonType = {
              slot: number;
              type: {
                name: string;
                url: string;
              };
            };
            
            // dados que serão utilizados
            return {
              id: details.data.id,
              name: details.data.name,
              image: details.data.sprites.other.showdown.front_default,
              shinyImage: details.data.sprites.other.showdown.front_shiny,
              types: details.data.types.map((t: PokemonType) => t.type.name),
            };
          })
        );
        setPokemons(detailedPokemons);
      } catch (err) {
        console.error("Erro ao carregar os Pokémon:", err);
      }
    }

    load();
  }, []);

  // função para alternar os shinys
  const toggleShiny = (id: number) => {
    setShinySet((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id); // se era shiny, deixa de ser
      } else {
        newSet.add(id); // se não era shiny, passa a ser
      }
      return newSet;
    });
  };

  // filtra os pokémons pelo nome digitado
  const filteredPokemons = pokemons.filter(
    (poke) =>
      poke.name.toLowerCase().includes(search.toLowerCase()) ||
      poke.types.some((t) => t.toLowerCase().includes(search.toLowerCase())) // busca também por tipo
  );

  return (
    <section className="py-10 container mx-auto px-4">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Lista de Pokémons
      </h2>

      {/* componente de pesquisa */}
      <SearchBar
        value={search}
        onChange={setSearch}
        placeholder="Buscar Pokémon por nome ou Tipo..."
      />

      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
      {filteredPokemons.map((poke) => (
        <PokemonCard
          key={poke.id}
          id={poke.id}
          name={poke.name}
          image={poke.image}
          shinyImage={poke.shinyImage}
          types={poke.types}
          isShiny={shinySet.has(poke.id)} // verifica se é shiny
          onToggleShiny={() => toggleShiny(poke.id)}
        />
      ))}
    </div>
    </section>
  );
}