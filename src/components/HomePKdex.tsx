'use client'

import { useEffect, useState } from "react"
import axios from "axios"
import PokemonCardLink from "./PokemonCardLink"
import SearchBar from "./SearchBar"
import { useViewMode } from "../app/context/ViewModeContext"

type Pokemon = {
  id: number
  name: string
  image: string
  shinyImage: string
  types: string[]
}

type PokemonType = {
  slot: number
  type: {
    name: string
    url: string
  }
}

export default function HomePKdex() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([])
  const [search, setSearch] = useState("")
  const [limit, setLimit] = useState(151)

  const { viewMode, toggleViewMode } = useViewMode()

  useEffect(() => {
    async function load() {
      try {
        const res = await axios.get(
          `https://pokeapi.co/api/v2/pokemon?limit=${limit}`
        )
        const detailedPokemons: Pokemon[] = await Promise.all(
          res.data.results.map(async (poke: { name: string; url: string }) => {
            const details = await axios.get(poke.url)
            const d = details.data

            const image =
              d.sprites?.other?.["official-artwork"]?.front_default ??
              d.sprites?.other?.showdown?.front_default ??
              d.sprites?.front_default ??
              ""

            const shinyImage =
              d.sprites?.other?.["official-artwork"]?.front_shiny ??
              d.sprites?.other?.showdown?.front_shiny ??
              d.sprites?.front_shiny ??
              ""

            return {
              id: d.id,
              name: d.name,
              image,
              shinyImage,
              types: d.types.map((t: PokemonType) => t.type.name),
            }
          })
        )
        setPokemons(detailedPokemons)
      } catch (err) {
        console.error("Erro ao carregar os Pokémon:", err)
      }
    }

    load()
  }, [limit])

  const filteredPokemons = pokemons.filter(
    (poke) =>
      poke.name.toLowerCase().includes(search.toLowerCase()) ||
      poke.types.some((t) => t.toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <section>
      {/* Barra de busca + botão de alternância */}
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
        <div className="w-full sm:flex-1">
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Buscar Pokémon por nome ou Tipo..."
          />
        </div>

        <button
          onClick={toggleViewMode}
          aria-label="Alternar modo de visualização"
          className={`w-full sm:w-44 px-4 py-2 rounded-lg font-semibold shadow-md transition
            ${
              viewMode === "grid"
                ? "bg-blue-500 hover:bg-blue-600 text-white"
                : "bg-yellow-500 hover:bg-yellow-600 text-white"
            }`}
        >
          {viewMode === "grid" ? "📋 Modo Lista" : "🔲 Modo Grade"}
        </button>
      </div>

      {/* GRID ou LIST */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {filteredPokemons.map((poke) => (
            <PokemonCardLink
              key={poke.id}
              id={poke.id}
              name={poke.name}
              image={poke.image}
              types={poke.types}
              variant="grid"
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {filteredPokemons.map((poke) => (
            <PokemonCardLink
              key={poke.id}
              id={poke.id}
              name={poke.name}
              image={poke.image}
              types={poke.types}
              variant="list"
            />
          ))}
        </div>
      )}

      {/* botão carregar mais */}
      <div className="flex justify-center mt-8">
        <button
          onClick={() => setLimit((prev) => prev + 151)}
          className="px-6 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition w-full sm:w-auto"
        >
          Carregar mais
        </button>
      </div>
    </section>
  )
}