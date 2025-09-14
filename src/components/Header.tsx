'use client'; // deixa em modo usuário, para rodar no navegador

/* bibliotecas */
import Link from "next/link";
import { useFavorites } from "../app/context/FavoritesContext";

// componente do cabeçalho principal
export default function Header() {
  const { favorites } = useFavorites(); // contador de favoritos

  return (
    <header className="bg-gray-800 text-white py-4 shadow-md sticky top-0 z-50">
      <nav className="container mx-auto flex justify-between items-center px-4">
        {/* logo que leva para home */}
        <Link href="/" className="text-2xl font-bold hover:text-yellow-400">
          Pokédex
        </Link>

        {/* menu de navegação */}
        <ul className="flex gap-6 text-sm font-medium items-center">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/teambuilder">Team Builder</Link>
          </li>
          <li>
            <Link href="/favorites">Favoritos ({favorites.length}/50)</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}