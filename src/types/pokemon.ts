// define a estrutura base de um Pokémon (dados vindos da API já tratados)
export type BasePokemon = {
  id: number; // ID único do Pokémon, o seu número na Pokédex
  name: string; // nome do Pokémon
  image: string; // sprite normal do Pokémon
  shinyImage: string; // sprite shiny do Pokémon
  types: string[]; // lista dos tipos
};

// tipagem para o componente PokemonCard
// inclui todos os dados básicos + props específicas do card
export type PokemonCardProps = BasePokemon & {
  isShiny: boolean; // se deve renderizar a sprite shiny ou normal
  onToggleShiny: () => void; // função chamada para alternar shiny/normal
};

// tipagem para o componente TrainerCard
// representa um slot no time do jogador
export type TrainerCardProps = {
  pokemon?: BasePokemon & { isShiny: boolean }; // o Pokémon no slot (ou vazio)
  onRemove?: () => void; // função para remover o Pokémon do time
  onToggleShiny?: () => void; // função para alternar shiny/normal
};