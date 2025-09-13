'use client'; // deixa em modo usuário, para rodar no navegador

/* bibliotecas */
import React from "react";

// tipagem das props esperadas pelo componente
type PokemonCardProps = {
  id: number;             // número do Pokémon na Pokédex
  name: string;           // nome do Pokémon
  image: string;          // sprite normal
  shinyImage: string;     // sprite shiny
  types: string[];        // lista de tipos
  isShiny: boolean;       // indica se o Pokémon está shiny
  onToggleShiny: () => void; // função chamada ao clicar na imagem para alternar normal/shiny
};

// cores para os tipo
// serão aplicados nos nomes, indicados pelo seus tipos principais
// tanto nas "caixinhas" de tipos
const typeColors: Record<string, string> = {
  fire: "text-red-500",
  water: "text-blue-500",
  grass: "text-green-500",
  electric: "text-yellow-400",
  psychic: "text-pink-500",
  ghost: "text-purple-500",
  dragon: "text-indigo-600",
  normal: "text-gray-600",
  fighting: "text-orange-700",
  poison: "text-purple-400",
  ground: "text-yellow-700",
  rock: "text-gray-500",
  bug: "text-green-600",
  ice: "text-cyan-400",
  fairy: "text-pink-400",
  steel: "text-gray-400",
  dark: "text-gray-800",
  flying: "text-sky-500",
};

// componente de Card do Pokémon
export default function PokemonCard({
  id,
  name,
  image,
  shinyImage,
  types,
  isShiny,
  onToggleShiny,
}: PokemonCardProps) {
  return (
    <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center hover:shadow-lg transition">
      {/* sprite com toggle de normal/shiny */}
      <img
        src={isShiny ? shinyImage : image}
        alt={name}
        className="w-20 h-auto object-contain cursor-pointer"
        onClick={onToggleShiny}
      />

      {/* nome colorido pelo tipo principal */}
      <p
        className={`mt-2 text-sm capitalize font-medium text-center ${
          typeColors[types[0]] || "text-gray-800"
        }`}
      >
        #{id} - {name}
      </p>

      {/* tipos com caixinhas coloridas */}
      <div className="w-full flex justify-center gap-1 mt-2 flex-wrap">
        {types.map((type) => (
          <span
            key={type}
            className={`text-xs px-2 py-0.5 rounded-full border uppercase ${
              typeColors[type] || "text-gray-600"
            }`}
          >
            {type}
          </span>
        ))}
      </div>
    </div>
  );
}