'use client'

import { useEffect, useState } from "react"
import axios from "axios"
import PokemonCardLink from "../components/PokemonCardLink"
import { BasePokemon } from "../types/pokemon"

type PokemonType = {
  slot: number
  type: {
    name: string
    url: string
  }
}

export default function Home() {
  const [pokemons, setPokemons] = useState<BasePokemon[]>([])
  const [search, setSearch] = useState("")

  useEffect(() => {
    async function load() {
      try {
        const res = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=151")

        const detailedPokemons: BasePokemon[] = await Promise.all(
          res.data.results.map(async (poke: { name: string; url: string }) => {
            const details = await axios.get(poke.url)
            return {
              id: details.data.id,
              name: details.data.name,
              image: details.data.sprites.other["official-artwork"].front_default,
              types: details.data.types.map((t: PokemonType) => t.type.name),
            }
          })
        )

        setPokemons(detailedPokemons)
      } catch (err) {
        console.error("Erro ao carregar os Pokémon:", err)
      }
    }

    load()
  }, [])

  const filteredPokemons = pokemons.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <section className="py-10 container mx-auto px-4">
      <h1 className="text-3xl font-bold text-center mb-6">Pokédex</h1>

      {/* barra de pesquisa */}
      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Buscar Pokémon..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-lg px-4 py-2 w-full max-w-md shadow-sm"
        />
      </div>

      {/* grid com os pokémon */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
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
    </section>
  )
}