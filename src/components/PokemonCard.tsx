'use client'

import React from "react"
import TypeBadge from "./TypeBadge"

type PokemonCardProps = {
  id: number
  name: string
  image: string
  shinyImage?: string
  types: string[]
  isShiny: boolean
  onToggleShiny: () => void
  showTypes?: boolean
  showId?: boolean
}

export default function PokemonCard({
  id,
  name,
  image,
  shinyImage,
  types,
  isShiny,
  onToggleShiny,
  showTypes = true,
  showId = true,
}: PokemonCardProps) {
  const sprite = isShiny ? shinyImage || image : image

  return (
    <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center hover:shadow-lg transition min-h-[12rem]">
      {/* sprite */}
      <img
        src={sprite}
        alt={name}
        className="w-full h-32 object-contain cursor-pointer"
        onClick={onToggleShiny}
      />

      {/* nome */}
      <p className="text-sm sm:text-base capitalize font-bold text-center text-gray-800 mt-2">
        {showId ? `#${id} - ${name}` : name}
      </p>

      {/* tipos */}
      {showTypes && (
        <div className="flex items-center justify-center gap-2 mt-2 flex-wrap">
          {types.map((type) => (
            <TypeBadge key={type} type={type} />
          ))}
        </div>
      )}
    </div>
  )
}