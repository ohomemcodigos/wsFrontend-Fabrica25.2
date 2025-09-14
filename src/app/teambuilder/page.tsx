'use client'; // deixa em modo usuário, para rodar no navegador

/* bibliotecas */
import { useEffect, useState } from "react";
import axios from "axios";

/* imports */
import TrainerCard from "../../components/TrainerCard";
import PokemonCard from "../../components/PokemonCard";
import { BasePokemon } from "../../types/pokemon";

// tipagem para os Tipos que a API retorna
type PokemonType = {
  slot: number;
  type: {
    name: string;
    url: string;
  };
};

export default function TeamBuilderPage() {
  // estado com a lista de todos os Pokémon carregados da API
  const [pokemons, setPokemons] = useState<BasePokemon[]>([]);

  // estado com o time do usuário, podendo eles serem shiny ou não
  const [team, setTeam] = useState<(BasePokemon & { isShiny: boolean })[]>([]);

  // carrega os Pokémon da API
  useEffect(() => {
    async function load() {
      try {
        const res = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=151");
        
        // para cada Pokémon básico, faz outra requisição pegando detalhes
        const detailedPokemons: BasePokemon[] = await Promise.all(
          res.data.results.map(async (poke: { name: string; url: string }) => {
            const details = await axios.get(poke.url);

            return {
              id: details.data.id,
              name: details.data.name,
              image:
                details.data.sprites.other?.showdown?.front_default ??
                details.data.sprites.front_default, // fallback seguro
              shinyImage:
                details.data.sprites.other?.showdown?.front_shiny ??
                details.data.sprites.front_shiny,
              types: details.data.types.map((t: PokemonType) => t.type.name),
            };
          })
        );

        setPokemons(detailedPokemons);
      } catch (err) {
        console.error("Erro ao carregar os Pokémon:", err);
      }
    }

    load();
  }, []);

  // adiciona um Pokémon ao time, com no máximo 6 Pokémon na equipe
  const addPokemon = (pokemon: BasePokemon) => {
    if (team.length >= 6) return;
    if (team.some((p) => p.id === pokemon.id)) return; // evita duplicados
    setTeam([...team, { ...pokemon, isShiny: false }]);
  };

  // remove um Pokémon do time
  const removePokemon = (index: number) => {
    setTeam(team.filter((_, i) => i !== index));
  };

  // alterna os sprites entre a versão normal e a versão shiny
  const toggleShiny = (index: number) => {
    setTeam(
      team.map((poke, i) =>
        i === index ? { ...poke, isShiny: !poke.isShiny } : poke
      )
    );
  };

  return (
    <section className="py-10 container mx-auto px-4 flex gap-8">
      {/* sidebar fixa com o time do usuário */}
      <aside className="w-72 h-fit sticky top-20 bg-white p-4 rounded-xl shadow-md">
        <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
          ⭐ Seu Time ⭐
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {/* renderiza 6 slots fixos para o time */}
          {Array.from({ length: 6 }).map((_, i) => (
            <TrainerCard
              key={i}
              pokemon={team[i]} // pode ser undefined, TrainerCard deve aceitar isso
              onRemove={() => removePokemon(i)}
              onToggleShiny={() => toggleShiny(i)}
              showTypes={false}
            />
          ))}
        </div>
      </aside>

      {/* lista de Pokémon disponíveis */}
      <div className="flex-1">
        <h2 className="text-xl font-bold mb-4 text-gray-700 text-center">
          Escolha seus Pokémon
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {pokemons.map((poke) => (
            <div
              key={poke.id}
              className="cursor-pointer"
              onClick={() => addPokemon(poke)}
            >
              <PokemonCard
                {...poke}
                isShiny={false}
                onToggleShiny={() => {}}
                showTypes={false}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}