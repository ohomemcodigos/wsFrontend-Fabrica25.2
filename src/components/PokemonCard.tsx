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
  shinyImage?: string; // sprite shiny (opcional)
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
  // garante que sempre haja uma sprite disponível
  const sprite = isShiny ? shinyImage || image : image;

  return (
    // card padronizado com altura fixa
    <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center justify-between hover:shadow-lg transition h-48">
      {/* sprite com tamanho fixo e proporcional */}
      <img
        src={sprite}
        alt={name}
        className="w-full h-32 object-contain cursor-pointer"
        onClick={onToggleShiny}
      />

      {/* nome do Pokémon (com ID opcional) */}
      <p className="text-sm sm:text-base capitalize font-bold text-center text-gray-800 mt-2 w-full">
        {showId ? `#${id} - ${name}` : name}
      </p>

      {/* tipos (se showTypes = true) */}
      {showTypes && (
        <div className="w-full flex justify-center gap-1 mt-1 flex-wrap">
          {types.map((type) => (
            <TypeBadge key={type} type={type} /> // renderiza badge para cada tipo
          ))}
        </div>
      )}
    </div>
  );
}