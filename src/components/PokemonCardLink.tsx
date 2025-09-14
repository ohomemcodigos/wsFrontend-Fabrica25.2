'use client'

import React from "react"
import Link from "next/link"
import TypeBadge from "./TypeBadge"

type PokemonCardLinkProps = {
  id: number
  name: string
  image?: string
  types: string[]
  showTypes?: boolean
  showId?: boolean
}

export default function PokemonCardLink({
  id,
  name,
  image,
  types,
  showTypes = true,
  showId = true,
}: PokemonCardLinkProps) {
  return (
    <Link href={`/details/${id}`}>
      <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center hover:shadow-lg transition cursor-pointer min-h-[12rem]">
        {/* sprite */}
        {image ? (
          <img src={image} alt={name} className="w-24 h-24 object-contain" />
        ) : (
          <div className="w-24 h-24 bg-gray-100 rounded flex items-center justify-center text-gray-500 text-xs">
            Sem imagem
          </div>
        )}

        {/* nome */}
        <p className="mt-2 text-sm capitalize font-bold text-center text-gray-800">
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
    </Link>
  )
}