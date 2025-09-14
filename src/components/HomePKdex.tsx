'use client'; // deixa em modo usuário, para rodar no navegador

/* bibliotecas */
import { useEffect, useState } from "react";
import axios from "axios";

/* imports */
import PokemonCardLink from "./PokemonCardLink";
import SearchBar from "./SearchBar";

/*
  HomePKdex.tsx
  - componente principal da Pokédex (home)
  - inclui: search, toggle de view (grid <-> list), paginação (carregar mais)
  - botão de alternar fica SOMENTE aqui (não vai pro Header) e é sempre visível
*/

// tipagem de dados que serão armazenados dos Pokémon
type Pokemon = {
  id: number;
  name: string;
  image: string;
  shinyImage: string;
  types: string[];
};

type PokemonType = {
  slot: number;
  type: {
    name: string;
    url: string;
  };
};

export default function HomePKdex() {
  // estados principais
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(151); // começa com 151
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid"); // modo de visualização

  // puxa os Pokémon da API (usa axios)
  useEffect(() => {
    async function load() {
      try {
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);

        const detailedPokemons: Pokemon[] = await Promise.all(
          res.data.results.map(async (poke: { name: string; url: string }) => {
            const details = await axios.get(poke.url);
            const d = details.data;

            // fallback chain para imagens: official-artwork -> showdown -> front_default
            const image =
              d.sprites?.other?.["official-artwork"]?.front_default ??
              d.sprites?.other?.showdown?.front_default ??
              d.sprites?.front_default ??
              "";

            const shinyImage =
              d.sprites?.other?.["official-artwork"]?.front_shiny ??
              d.sprites?.other?.showdown?.front_shiny ??
              d.sprites?.front_shiny ??
              "";

            return {
              id: d.id,
              name: d.name,
              image,
              shinyImage,
              types: d.types.map((t: PokemonType) => t.type.name),
            };
          })
        );

        setPokemons(detailedPokemons);
      } catch (err) {
        console.error("Erro ao carregar os Pokémon:", err);
      }
    }

    load();
  }, [limit]);

  // filtra pokémons por nome ou tipo
  const filteredPokemons = pokemons.filter(
    (poke) =>
      poke.name.toLowerCase().includes(search.toLowerCase()) ||
      poke.types.some((t) => t.toLowerCase().includes(search.toLowerCase()))
  );

  // alterna modo de visualização (grid <-> list)
  const toggleView = () => setViewMode((prev) => (prev === "grid" ? "list" : "grid"));

  return (
    <section className="py-10 container mx-auto px-4">
      {/* título */}
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Lista de Pokémons</h2>

      {/* barra de pesquisa + botão alternar view (sempre visível) */}
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
        {/* SearchBar ocupa espaço flexível no desktop para não "empurrar" o botão */}
        <div className="w-full sm:flex-1">
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Buscar Pokémon por nome ou Tipo..."
          />
        </div>

        {/* botão sempre visível:
            - mobile: ocupa largura total (w-full)
            - desktop: largura fixa (sm:w-44) para garantir visibilidade
            - estilo consistente com botões do projeto */}
        <button
          onClick={toggleView}
          aria-label="Alternar modo de visualização"
          className={`w-full sm:w-44 px-4 py-2 rounded-lg font-semibold shadow-md transition
            ${viewMode === "grid" ? "bg-blue-500 hover:bg-blue-600 text-white" : "bg-yellow-500 hover:bg-yellow-600 text-white"}`}
        >
          {viewMode === "grid" ? "📋 Modo Lista" : "🔲 Modo Grade"}
        </button>
      </div>

      {/* renderização condicional: GRID */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-6">
          {filteredPokemons.map((poke) => (
            <PokemonCardLink
              key={poke.id}
              id={poke.id}
              name={poke.name}
              image={poke.image}
              types={poke.types}
            />
          ))}
        </div>
      ) : (
        /* RENDERIZAÇÃO: LIST (vertical) */
        <div className="flex flex-col gap-4">
          {filteredPokemons.map((poke) => (
            <div
              key={poke.id}
              className="flex flex-col sm:flex-row items-center sm:items-start gap-4 bg-white rounded-xl shadow p-4"
            >
              <img
                src={poke.image}
                alt={poke.name}
                className="w-28 h-28 sm:w-20 sm:h-20 object-contain"
              />
              <div className="text-center sm:text-left">
                <p className="text-lg font-bold capitalize text-gray-800">
                  #{poke.id} - {poke.name}
                </p>
                <p className="text-sm text-gray-600">Tipos: {poke.types.join(", ")}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* botão carregar mais (paginação incremental) */}
      <div className="flex justify-center mt-8">
        <button
          onClick={() => setLimit((prev) => prev + 151)}
          className="px-6 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition w-full sm:w-auto"
        >
          Carregar mais
        </button>
      </div>
    </section>
  );
}