'use client'; // deixa em modo usuário, para rodar no navegador

/* bibliotecas */
import React from "react";

/* imports */
import { BasePokemon } from "../types/pokemon";
import TypeBadge from "./TypeBadge";

// tipagem das props
type TrainerCardProps = {
  pokemon?: BasePokemon & { isShiny?: boolean }; // slot no qual o Pokémon ocupa
  onRemove?: () => void; // callback para remover o Pokémon do time
  onToggleShiny?: () => void; // callback para alternar entre normal/shiny
  showTypes?: boolean; // se mostra ou não os tipos
};

export default function TrainerCard({
  pokemon,
  onRemove,
  onToggleShiny,
  showTypes = false,
}: TrainerCardProps) {
  // se o slot estiver vazio, renderiza um card "Vazio"
  if (!pokemon) {
    return (
      <div className="bg-gray-100 rounded-xl flex items-center justify-center text-gray-400 text-sm h-32">
        Vazio
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow relative h-32 flex flex-col items-center justify-between p-2">
      {/* botão de remover */}
      <button
        onClick={() => onRemove && onRemove()}
        className="absolute top-1 right-1 text-red-500 hover:text-red-700 text-xs"
        aria-label={`Remover ${pokemon.name} do time`}
      >
        ✕
      </button>

      {/* sprite do Pokémon (alternável entre normal/shiny ao clicar) */}
      <img
        src={pokemon.isShiny ? pokemon.shinyImage : pokemon.image}
        alt={pokemon.name || "Pokémon"}
        className="w-24 h-24 object-contain cursor-pointer"
        onClick={() => onToggleShiny && onToggleShiny()}
      />

      {/* nome do Pokémon centralizado */}
      <p className="text-xs sm:text-sm capitalize font-semibold text-center text-gray-800 leading-tight mt-1">
        {pokemon.name}
      </p>

      {/* tipos menores (se ativado) */}
      {showTypes && (
        <div className="w-full flex justify-center gap-1 mt-1 flex-wrap">
          {pokemon.types.map((type) => (
            <TypeBadge key={type} type={type} small />
          ))}
        </div>
      )}
    </div>
  );
}