'use client'

// bibliotecas React e Axios
import { use, useEffect, useState } from "react"
import axios from "axios"

// contexto de favoritos
import { useFavorites } from "../../context/FavoritesContext"

// tipagem para os tipos do Pokémon
interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

// tipagem principal do Pokémon
interface Pokemon {
  id: number;
  name: string;
  weight: number;
  base_experience: number;
  types: PokemonType[];
  sprites: {
    other: {
      ["official-artwork"]: {
        front_default: string;
        front_shiny: string;
      };
    };
  };
}

// componente de detalhes do Pokémon
export default function PokemonDetalhes({ params }: { params: Promise<{ id: string }> }) {
  // ⚡️ desestrutura o ID corretamente (Next.js 15 → params é Promise)
  const { id } = use(params)

  // hooks do contexto de favoritos
  const { addFavorite, removeFavorite, isFavorite } = useFavorites()

  // estado do Pokémon carregado
  const [pokemon, setPokemon] = useState<Pokemon | null>(null)

  // controla se o sprite mostrado é normal ou shiny
  const [isShiny, setIsShiny] = useState<boolean>(false)

  // busca os dados do Pokémon ao carregar a página
  useEffect(() => {
    async function load() {
      try {
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
        setPokemon(res.data) // salva no estado
      } catch (err) {
        console.error("Erro ao carregar Pokémon:", err)
      }
    }
    load()
  }, [id])

  // se ainda não carregou o Pokémon, mostra mensagem
  if (!pokemon) return <p className="text-center mt-8">Carregando...</p>

  // checa se já está nos favoritos
  const favorito = isFavorite(pokemon.id)

  // define qual sprite deve ser mostrado (normal ou shiny)
  const sprite = isShiny
    ? pokemon.sprites.other["official-artwork"].front_shiny
    : pokemon.sprites.other["official-artwork"].front_default

  return (
    <section className="container mx-auto px-4 py-10">
      {/* caixa principal */}
      <div className="bg-white p-6 rounded-xl shadow-md max-w-lg mx-auto text-center">
        
        {/* título com nome e número */}
        <h1 className="text-3xl font-bold capitalize mb-4 text-gray-800">
          #{pokemon.id} - {pokemon.name}
        </h1>

        {/* sprite centralizado */}
        <img
          src={sprite}
          alt={pokemon.name}
          className="w-48 h-48 mx-auto transition-transform duration-300 hover:scale-110"
        />

        {/* botões de ação */}
        <div className="mt-4 flex gap-4 justify-center">
          {/* botão de favoritar/remover */}
          <button
            onClick={() =>
              favorito
                ? removeFavorite(pokemon.id)
                : addFavorite({
                    id: pokemon.id,
                    name: pokemon.name,
                    image: pokemon.sprites.other["official-artwork"].front_default,
                  })
            }
            className={`px-4 py-2 rounded-lg text-white font-semibold shadow ${
              favorito
                ? "bg-red-500 hover:bg-red-600"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {favorito ? "Remover dos Favoritos" : "Favoritar ⭐"}
          </button>

          {/* botão de alternar sprite */}
          <button
            onClick={() => setIsShiny(!isShiny)}
            className="px-4 py-2 rounded-lg bg-yellow-500 hover:bg-yellow-600 text-white font-semibold shadow"
          >
            {isShiny ? "Sprite Normal" : "Sprite Shiny ✨"}
          </button>
        </div>

        {/* infos extras */}
        <div className="mt-6 text-gray-700 space-y-2">
          <p><strong>Tipo(s):</strong> {pokemon.types.map((t) => t.type.name).join(", ")}</p>
          <p><strong>Peso:</strong> {pokemon.weight / 10} kg</p>
          <p><strong>Experiência base:</strong> {pokemon.base_experience}</p>
        </div>
      </div>
    </section>
  )
}