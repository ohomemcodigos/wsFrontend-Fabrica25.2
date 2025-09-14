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
      className={`text-xs px-2 py-0.5 rounded-full border-2 uppercase font-bold ${
        typeColors[type] || "text-gray-600"
      }`}
    >
      {type} {/* texto exibido no badge */}
    </span>
  );
}