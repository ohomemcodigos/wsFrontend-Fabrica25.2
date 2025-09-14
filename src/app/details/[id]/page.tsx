'use client'

import { use, useEffect, useState } from "react"
import axios from "axios"
import { useFavorites } from "../../context/FavoritesContext"
import TypeBadge from "../../../components/TypeBadge"

interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

interface Pokemon {
  id: number;
  name: string;
  weight: number;
  base_experience: number;
  types: PokemonType[];
  sprites: {
    other?: {
      ["official-artwork"]?: {
        front_default?: string;
        front_shiny?: string;
      };
      showdown?: {
        front_default?: string;
        front_shiny?: string;
      };
    };
    front_default?: string;
    front_shiny?: string;
  };
}

export default function PokemonDetalhes({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const { addFavorite, removeFavorite, isFavorite } = useFavorites()

  const [pokemon, setPokemon] = useState<Pokemon | null>(null)
  const [isShiny, setIsShiny] = useState<boolean>(false)

  useEffect(() => {
    async function load() {
      try {
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
        setPokemon(res.data)
      } catch (err) {
        console.error("Erro ao carregar Pokémon:", err)
      }
    }
    if (id) load()
  }, [id])

  if (!pokemon) return <p className="text-center mt-8">Carregando...</p>

  const favorito = isFavorite(pokemon.id)

  const getImg = (isShinyRequested: boolean) => {
    const art = pokemon.sprites.other?.["official-artwork"]
    const sd = pokemon.sprites.other?.showdown
    if (isShinyRequested) {
      return art?.front_shiny ?? sd?.front_shiny ?? pokemon.sprites.front_shiny ?? ""
    }
    return art?.front_default ?? sd?.front_default ?? pokemon.sprites.front_default ?? ""
  }

  const sprite = getImg(isShiny)

  return (
    <section className="container mx-auto px-4 py-10">
      <div className="bg-white p-6 sm:p-8 rounded-xl shadow-md max-w-lg mx-auto text-center">
        
        {/* título */}
        <h1 className="text-xl sm:text-3xl font-bold capitalize mb-4 text-gray-800">
          #{pokemon.id} - {pokemon.name}
        </h1>

        {/* imagem */}
        {sprite ? (
          <img
            src={sprite}
            alt={pokemon.name}
            className="max-w-full w-40 sm:w-56 h-auto mx-auto transition-transform duration-300 hover:scale-110"
          />
        ) : (
          <div className="w-32 h-32 sm:w-48 sm:h-48 bg-gray-100 rounded-lg mx-auto flex items-center justify-center text-gray-500">
            Sem imagem
          </div>
        )}

        {/* botões */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center items-stretch sm:items-center">
          <button
            onClick={() =>
              favorito
                ? removeFavorite(pokemon.id)
                : addFavorite({
                    id: pokemon.id,
                    name: pokemon.name,
                    image: getImg(false) || ""
                  })
            }
            className={`px-4 py-2 rounded-lg text-white font-semibold shadow text-sm sm:text-base
              ${favorito ? "bg-red-500 hover:bg-red-600" : "bg-blue-500 hover:bg-blue-600"}`}
          >
            {favorito ? (
              "Remover dos Favoritos"
            ) : (
              <>
                Favoritar{" "}
                <span className="text-yellow-400 font-bold">⭐</span>
              </>
            )}
          </button>


          <button
            onClick={() => setIsShiny(!isShiny)}
            className="px-4 py-2 rounded-lg bg-yellow-500 hover:bg-yellow-600 text-white font-semibold shadow text-sm sm:text-base"
          >
            {isShiny ? "Sprite Normal" : "Sprite Shiny ✨"}
          </button>
        </div>

        {/* informações */}
        <div className="mt-6 text-gray-700 space-y-3 text-sm sm:text-base">
          <div className="flex flex-col sm:flex-row items-center sm:justify-center gap-2">
            <strong>Tipo(s):</strong>
            <div className="flex gap-2 flex-wrap justify-center">
              {pokemon.types.map((t) => (
                <TypeBadge key={t.type.name} type={t.type.name} />
              ))}
            </div>
          </div>
          <p><strong>Peso:</strong> {pokemon.weight / 10} kg</p>
          <p><strong>Experiência base:</strong> {pokemon.base_experience}</p>
        </div>
      </div>
    </section>
  ) 
}