'use client'

import Link from "next/link"
import { useFavorites } from "../app/context/FavoritesContext"
import { useEffect, useState } from "react"

export default function Header() {
  const { favorites } = useFavorites()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <header className="bg-gray-800 text-white py-4 shadow-md sticky top-0 z-50">
      <nav className="container mx-auto flex justify-between items-center px-4">
        {/* logo */}
        <Link href="/" className="text-2xl font-bold hover:text-yellow-400">
          Pokédex
        </Link>

        {/* menu */}
        <ul className="flex gap-6 text-sm font-medium items-center">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/teambuilder">Team Builder</Link>
          </li>
          <li>
            <Link href="/favorites" className="flex items-center gap-1">
              Favoritos{" "}
              {mounted && (
                <span className="text-yellow-400 font-bold">
                  ({favorites.length}/50)
                </span>
              )}
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}