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
  variant?: "grid" | "list" // novo: controla o layout
}

export default function PokemonCardLink({
  id,
  name,
  image,
  types,
  showTypes = true,
  showId = true,
  variant = "grid",
}: PokemonCardLinkProps) {
  if (variant === "list") {
    return (
      <Link href={`/details/${id}`}>
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 bg-white rounded-xl shadow p-4 hover:shadow-lg transition cursor-pointer">
          {/* imagem */}
          {image ? (
            <img
              src={image}
              alt={name}
              className="w-28 h-28 sm:w-20 sm:h-20 object-contain"
            />
          ) : (
            <div className="w-28 h-28 sm:w-20 sm:h-20 bg-gray-100 rounded flex items-center justify-center text-gray-500 text-xs">
              Sem imagem
            </div>
          )}

          {/* info */}
          <div className="text-center sm:text-left">
            <p className="text-lg font-bold capitalize text-gray-800">
              {showId ? `#${id} - ${name}` : name}
            </p>
            {showTypes && (
              <div className="flex flex-wrap gap-1 mt-1 justify-center sm:justify-start">
                {types.map((type) => (
                  <TypeBadge key={type} type={type} />
                ))}
              </div>
            )}
          </div>
        </div>
      </Link>
    )
  }

  // layout GRID (original)
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