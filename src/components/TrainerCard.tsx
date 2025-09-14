'use client'; // deixa em modo usuário, para rodar no navegador

/* bibliotecas */
import React from "react";

/* imports */
import TypeBadge from "./TypeBadge"; // componente para exibir os tipos
import { BasePokemon } from "../types/pokemon";

// tipagem das props
type TrainerCardProps = {
  pokemon?: BasePokemon & { isShiny?: boolean }; // slot no qual o Pokémon ocupa
  onRemove?: () => void; // callback para remover o Pokémon do time
  onToggleShiny?: () => void; // callback para alternar entre normal/shiny
  showTypes?: boolean; // alterna entre mostrar ou não os Tipos
};

export default function TrainerCard({
  pokemon,
  onRemove,
  onToggleShiny,
  showTypes = false, // por padrão não mostra os Tipos
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
      {/* botão de remover Pokémon */}
      {onRemove && (
        <button
          onClick={onRemove}
          className="absolute top-1 right-1 text-xs bg-red-500 text-white px-2 py-0.5 rounded hover:bg-red-600"
          aria-label={`Remover ${pokemon.name} do time`}
        >
          ✕
        </button>
      )}

      {/* sprite do Pokémon (alternável entre normal/shiny ao clicar) */}
      <img
        src={pokemon.isShiny ? pokemon.shinyImage : pokemon.image}
        alt={pokemon.name || "Pokémon"}
        className="h-20 w-auto object-contain cursor-pointer"
        onClick={() => onToggleShiny && onToggleShiny()} // só chama se a função existir
      />

      {/* nome do Pokémon */}
      <p className="text-xs capitalize font-medium text-center text-gray-800 truncate w-full">
        {pokemon.name}
      </p>

      {/* Tipos do Pokémon (opcional) */}
      {showTypes && (
        <div className="w-full flex justify-center gap-1 mt-1 flex-wrap">
          {pokemon.types.map((type) => (
            <TypeBadge key={type} type={type} />
          ))}
        </div>
      )}
    </div>
  );
}