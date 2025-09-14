'use client'

import { createContext, useContext, useState, ReactNode } from "react"

type FavoritePokemon = {
  id: number
  name: string
  image: string
}

type FavoritesContextType = {
  favorites: FavoritePokemon[]
  addFavorite: (pokemon: FavoritePokemon) => void
  removeFavorite: (id: number) => void
  isFavorite: (id: number) => boolean
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined)

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<FavoritePokemon[]>([])

  const addFavorite = (pokemon: FavoritePokemon) => {
    if (favorites.length >= 50) {
      alert("Você só pode favoritar até 50 Pokémons!")
      return
    }
    if (!favorites.some((f) => f.id === pokemon.id)) {
      setFavorites([...favorites, pokemon])
    }
  }

  const removeFavorite = (id: number) => {
    setFavorites(favorites.filter((f) => f.id !== id))
  }

  const isFavorite = (id: number) => {
    return favorites.some((f) => f.id === id)
  }

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const context = useContext(FavoritesContext)
  if (!context) throw new Error("useFavorites deve ser usado dentro de FavoritesProvider")
  return context
}