'use client'; // deixa em modo usuário, para rodar no navegador

/* bibliotecas */
import React from "react";

/* imports */
import TypeBadge from "./TypeBadge"; // componente para exibir os tipos

// tipagem das props que o componente recebe
type PokemonCardProps = {
  id: number; // número do Pokémon na Pokédex
  name: string; // nome do Pokémon
  image: string; // sprite normal
  shinyImage: string; // sprite shiny
  types: string[]; // lista de tipos
  isShiny: boolean; // flag indicando se deve mostrar a versão shiny
  onToggleShiny: () => void; // callback quando clica na sprite

  /* props opcionais */
  showTypes?: boolean; // se true, mostra os tipos (default: true)
  showId?: boolean;    // se true, mostra o ID junto do nome (default: true)
};

export default function PokemonCard({
  id,
  name,
  image,
  shinyImage,
  types,
  isShiny,
  onToggleShiny,
  showTypes = true, // valor padrão
  showId = true, // valor padrão
}: PokemonCardProps) {
  return (
    <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center hover:shadow-lg transition">
      {/* sprite com toggle shiny */}
      <img
        src={isShiny ? shinyImage : image}
        alt={name}
        className="sprite cursor-pointer"
        onClick={onToggleShiny}
      />

      {/* nome do Pokémon (pode mostrar com ID ou só o nome) */}
      <p className="mt-2 text-sm capitalize font-black text-center text-gray-800">
        {showId ? `#${id} - ${name}` : name}
      </p>

      {/* tipos (se showTypes = true) */}
      {showTypes && (
        <div className="w-full flex justify-center gap-1 mt-2 flex-wrap">
          {types.map((type) => (
            <TypeBadge key={type} type={type} /> // renderiza badge para cada tipo
          ))}
        </div>
      )}
    </div>
  );
}