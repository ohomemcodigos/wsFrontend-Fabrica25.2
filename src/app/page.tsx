'use client' // deixa em modo usuário, para rodar no navegador

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
        // pega uma lista grande (2000) para cobrir todas as gerações
        const res = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=2000")

        const detailedPokemons: BasePokemon[] = await Promise.all(
          res.data.results.map(async (poke: { name: string; url: string }) => {
            const details = await axios.get(poke.url)
            const d = details.data

            // fallback chain para imagem: official-artwork -> showdown -> front_default
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

        setPokemons(detailedPokemons.filter(p => p.image)) // opcional: filtra quem não tem imagem
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