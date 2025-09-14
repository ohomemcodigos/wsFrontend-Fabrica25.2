'use client'

import { useEffect, useState } from "react"
import axios from "axios"
import TrainerCard from "../../components/TrainerCard"
import PokemonCard from "../../components/PokemonCard"
import SearchBar from "../../components/SearchBar"
import { BasePokemon } from "../../types/pokemon"

type PokemonType = {
  slot: number
  type: { name: string; url: string }
}

export default function TeamBuilderPage() {
  const [pokemons, setPokemons] = useState<BasePokemon[]>([])
  const [search, setSearch] = useState("")
  const [team, setTeam] = useState<(BasePokemon & { isShiny: boolean })[]>([])

  useEffect(() => {
    async function load() {
      try {
        const res = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=2000")
        const detailedPokemons: BasePokemon[] = await Promise.all(
          res.data.results.map(async (poke: { name: string; url: string }) => {
            const details = await axios.get(poke.url)
            const d = details.data

            const image =
              d.sprites.other?.["official-artwork"]?.front_default ||
              d.sprites.other?.showdown?.front_default ||
              d.sprites.front_default

            const shinyImage =
              d.sprites.other?.["official-artwork"]?.front_shiny ||
              d.sprites.other?.showdown?.front_shiny ||
              d.sprites.front_shiny

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
  }, [])

  const addPokemon = (pokemon: BasePokemon) => {
    if (team.length < 6) setTeam([...team, { ...pokemon, isShiny: false }])
  }

  const removePokemon = (index: number) => {
    setTeam(team.filter((_, i) => i !== index))
  }

  const toggleShiny = (index: number) => {
    setTeam(
      team.map((poke, i) =>
        i === index ? { ...poke, isShiny: !poke.isShiny } : poke
      )
    )
  }

  const filteredPokemons = pokemons.filter(
    (poke) =>
      poke.name.toLowerCase().includes(search.toLowerCase()) ||
      poke.types.some((t) => t.toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <section className="py-10 container mx-auto px-4 flex flex-col lg:flex-row gap-6 lg:gap-8">
      {/* sidebar */}
      <aside className="lg:w-72 w-full h-fit lg:sticky top-20 bg-white p-4 rounded-xl shadow-md">
        <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 text-center">
          ⭐ Seu Time ⭐
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-3 sm:gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <TrainerCard
              key={i}
              pokemon={team[i]}
              onRemove={() => removePokemon(i)}
              onToggleShiny={() => toggleShiny(i)}
              showTypes={false}
            />
          ))}
        </div>
      </aside>

      {/* lista de pokémons */}
      <div className="flex-1">
        <h2 className="text-lg sm:text-xl font-bold mb-4 text-gray-700 text-center">
          Escolha seus Pokémon
        </h2>

        <div className="mb-6">
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Buscar Pokémon por nome ou Tipo..."
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {filteredPokemons.map((poke) => (
            <div
              key={poke.id}
              className="cursor-pointer"
              onClick={() => addPokemon(poke)}
            >
              <PokemonCard
                {...poke}
                isShiny={false}
                onToggleShiny={() => {}}
                showTypes={false}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}