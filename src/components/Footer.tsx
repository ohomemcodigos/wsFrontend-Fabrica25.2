// componente do rodapé da página
export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t mt-8">
      {/* conteúdo centralizado com espaçamento interno */}
      <div className="container mx-auto px-4 py-6 text-center text-gray-600 text-sm">
        {/* decoração do footer que mostra o ano e o Copyright */}
        © {new Date().getFullYear()} Pokédex — Criado para Fábrica de Software
        <p>Feito por Guilherme Mendonça - Next.js & PokéAPI ⚡</p>
      </div>
    </footer>
  );
}