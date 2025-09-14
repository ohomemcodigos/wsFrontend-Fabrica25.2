'use client'; // deixa em modo usuário, para rodar no navegador

/* bibliotecas */
import Link from "next/link";

/* context */
import { useFavorites } from "../app/context/FavoritesContext";

// componente do cabeçalho principal
export default function Header() {
  const { favorites } = useFavorites(); // pega os favoritos do contexto
  const count = favorites.length; // conta quantos já foram adicionados

  return (
    // header fixo no topo
    <header className="bg-gray-800 text-white py-4 shadow-md sticky top-0 z-50">
      <nav className="container mx-auto flex justify-between items-center px-4">
        {/* logo */}
        <Link href="/" className="text-2xl font-bold hover:text-yellow-400">
          Pokédex
        </Link>

        {/* menu de navegação */}
        <ul className="flex gap-6 text-sm font-medium items-center">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/teambuilder">Team Builder</Link></li>
          <li className="flex items-center gap-2">
            <Link href="/favorites">Favoritos</Link>
            <span className="bg-yellow-400 text-gray-900 px-2 py-0.5 rounded-full text-xs font-bold">
              {count}/50
            </span>
          </li>
        </ul>
      </nav>
    </header>
  );
}