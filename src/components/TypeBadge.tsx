'use client'; // deixa em modo usuário, para rodar no navegador

/* bibliotecas */
import React from "react";

/* imports */
import { typeColors } from "../utils/typeColors";

// tipagem das props
type TypeBadgeProps = {
  type: string; // tipo do Pokémon
};

export default function TypeBadge({ type }: TypeBadgeProps) {
  return (
    <span
      className={`text-xs sm:text-sm px-2 py-0.5 rounded-full border-2 uppercase font-bold ${
        typeColors[type] || "text-gray-600 border-gray-400"
      }`}
    >
      {type}
    </span>
  );
}