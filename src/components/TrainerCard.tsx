'use client'; // deixa em modo usuário, para rodar no navegador

/* bibliotecas */
import React from "react";

/* imports */
import PokemonCard from "./PokemonCard";
import { BasePokemon } from "../types/pokemon";

// tipagem das props
type TrainerCardProps = {
  pokemon?: BasePokemon & { isShiny?: boolean }; // slot no qual o Pokémon ocupa
  onRemove?: () => void; // callback para remover o Pokémon do time
  onToggleShiny?: () => void; // calback para alternar entre normal/shiny
};

export default function TrainerCard({
  pokemon,
  onRemove,
  onToggleShiny,
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
      {/* sprite do Pokémon (alternável entre normal/shiny ao clicar) */}
      <img
        src={pokemon.isShiny ? pokemon.shinyImage : pokemon.image}
        alt={pokemon.name || "Pokémon"}
        className="w-16 h-16 object-contain cursor-pointer"
        onClick={() => onToggleShiny && onToggleShiny()} // só chama se a função existir
      />

      {/* nome do Pokémon */}
      <p className="text-xs capitalize font-medium text-center text-gray-800">
        {pokemon.name}
      </p>

      {/* botão de remover */}
      <button
        onClick={() => onRemove && onRemove()} // só chama se a função existir
        className="absolute top-1 right-1 text-red-500 hover:text-red-700 text-xs"
        aria-label={`Remover ${pokemon.name} do time`}
      >
        ✕
      </button>
    </div>
  );
}