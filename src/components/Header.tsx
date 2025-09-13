'use client'; // deixa em modo usuário, para rodar no navegador

/* bibliotecas */
// importa o componente Link do Next.js para navegação sem recarregar a página
import Link from "next/link";

// componente do cabeçalho principal
export default function Header() {
  return (
    // header fixo no topo
    <header className="bg-gray-800 text-white py-4 shadow-md sticky top-0 z-50">
      <nav className="container mx-auto flex justify-between items-center px-4">
         {/* nav centralizado com espaçamento interno */}

         {/* transforma a logo em um link para a home */}
        <Link href="/" className="text-2xl font-bold hover:text-yellow-400">
          Pokédex
        </Link>

        {/* menu de navegação */}
        <ul className="flex gap-6 text-sm font-medium">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/teambuilder">Team Builder</Link></li>
        </ul>
      </nav>
    </header>
  );
}
