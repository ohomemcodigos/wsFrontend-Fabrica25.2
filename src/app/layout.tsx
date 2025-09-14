/* componentes */
import Header from '../components/Header'
import Footer from '../components/Footer'

import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"

/* context */
import { FavoritesProvider } from "./context/FavoritesContext"

/* estilização */
import '../styles/globals.css'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Pokédex",
  description: "Projeto com PokeAPI",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* 🔥 Agora todas as páginas têm acesso ao contexto */}
        <FavoritesProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </FavoritesProvider>
      </body>
    </html>
  )
}