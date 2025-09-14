'use client'

import React from "react"
import Link from "next/link"
import TypeBadge from "./TypeBadge"

type PokemonCardLinkProps = {
  id: number
  name: string
  image: string
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
      <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center hover:shadow-lg transition cursor-pointer">
        <img src={image} alt={name} className="sprite" />

        <p className="mt-2 text-sm capitalize font-black text-center text-gray-800">
          {showId ? `#${id} - ${name}` : name}
        </p>

        {showTypes && (
          <div className="w-full flex justify-center gap-1 mt-2 flex-wrap">
            {types.map((type) => (
              <TypeBadge key={type} type={type} />
            ))}
          </div>
        )}
      </div>
    </Link>
  )
}