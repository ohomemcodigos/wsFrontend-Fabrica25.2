'use client'

// mantém seus comentários e estrutura, adicionei persistência/localStorage
import { createContext, useContext, useEffect, useState, ReactNode } from "react"

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
  count: number
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined)

export function FavoritesProvider({ children }: { children: ReactNode }) {
  // carrega a lista inicial do localStorage (se existir)
  const [favorites, setFavorites] = useState<FavoritePokemon[]>(() => {
    try {
      const raw = typeof window !== "undefined" ? localStorage.getItem("favorites") : null
      return raw ? JSON.parse(raw) : []
    } catch {
      return []
    }
  })

  // salva sempre que favorites mudar
  useEffect(() => {
    try {
      localStorage.setItem("favorites", JSON.stringify(favorites))
    } catch (err) {
      console.error("Erro ao salvar favoritos:", err)
    }
  }, [favorites])

  const addFavorite = (pokemon: FavoritePokemon) => {
    if (favorites.length >= 50) {
      alert("Você só pode favoritar até 50 Pokémons!")
      return
    }
    if (!favorites.some((f) => f.id === pokemon.id)) {
      setFavorites((prev) => [...prev, pokemon])
    }
  }

  const removeFavorite = (id: number) => {
    setFavorites((prev) => prev.filter((f) => f.id !== id))
  }

  const isFavorite = (id: number) => {
    return favorites.some((f) => f.id === id)
  }

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite, count: favorites.length }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const context = useContext(FavoritesContext)
  if (!context) throw new Error("useFavorites deve ser usado dentro de FavoritesProvider")
  return context
}