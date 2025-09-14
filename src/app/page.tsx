'use client'

import HomePKdex from "../components/HomePKdex"

export default function Home() {
  return (
    <section className="py-10 container mx-auto px-4">
      <h1 className="text-3xl font-bold text-center mb-6">Pokédex</h1>
      <HomePKdex />
    </section>
  )
}