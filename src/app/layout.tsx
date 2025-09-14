import "../styles/globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { FavoritesProvider } from "./context/FavoritesContext";
import { ViewModeProvider } from "./context/ViewModeContext";

export const metadata = {
  title: "Pokédex",
  description: "Projeto com PokeAPI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">
        <ViewModeProvider>
          <FavoritesProvider>
            <Header />   {/* ✅ Agora dentro do Provider */}
            <main>{children}</main>
            <Footer />
          </FavoritesProvider>
        </ViewModeProvider>
      </body>
    </html>
  );
}