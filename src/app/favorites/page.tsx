'use client'

// bibliotecas
import { useFavorites } from "../context/FavoritesContext"
import Link from "next/link"

export default function FavoritosPage() {
  // pega favoritos do contexto
  const { favorites, removeFavorite } = useFavorites()

  return (
    <section className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        ⭐ Meus Favoritos ⭐
      </h1>

      {/* se não houver favoritos */}
      {favorites.length === 0 ? (
        <p className="text-center text-gray-500">
          Nenhum Pokémon favoritado ainda. Vá em{" "}
          <Link href="/" className="text-blue-500 hover:underline">Home</Link>{" "}
          e adicione seus favoritos!
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {favorites.map((poke) => (
            <div key={poke.id} className="bg-white p-4 rounded-xl shadow flex flex-col items-center hover:shadow-lg transition">
              <Link href={`/details/${poke.id}`} className="w-full flex flex-col items-center">
                {poke.image ? (
                  <img src={poke.image} alt={poke.name} className="w-24 h-24 object-contain mb-2" />
                ) : (
                  <div className="w-24 h-24 bg-gray-100 flex items-center justify-center rounded mb-2 text-gray-500">Sem imagem</div>
                )}
                <p className="capitalize font-semibold text-gray-800">{poke.name}</p>
              </Link>

              <button
                onClick={() => removeFavorite(poke.id)}
                className="mt-2 px-3 py-1 rounded-lg text-sm bg-red-500 hover:bg-red-600 text-white"
              >
                Remover
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}