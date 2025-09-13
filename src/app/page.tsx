"use client" //para funcionar em client components

/* bibliotecas */
import React, { useEffect, useState } from 'react'
import axios from 'axios'

//declaração das váriaveis dos pokemon
type Pokemon = {
  name: string
  url: string
}

//função para manter os pokemon salvos em uma lista no State
export default function HomePKdex() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
}

useEffect(() =>{ //chama  API
  async function load(){
    const res = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=10000")
    setPokemon(res.data.results)
  }
  load();
}, [])

export default function HomePKdex() {
  return (
    <>
      <Header />
      <main>
        <h2>Lista de Pokémons</h2>
      </main>
      <Footer />
    </>
  )
}