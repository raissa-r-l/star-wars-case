import { useEffect, useState } from "react";
import { Character } from "../types/character";

const CharacterCard = ({ character }: { character: Character }) => {
  const [planetName, setPlanetName] = useState("");

  useEffect(() => {
    if (character.homeworld) {
      fetch(character.homeworld)
        .then((res) => res.json())
        .then((data) => setPlanetName(data.name))
        .catch((err) => console.error("Erro ao buscar planeta:", err));
    }
  }, [character.homeworld]);

  return (
    <div className="flex sm:block items-center h-[176px] sm:h-[478px] gap-x-[30px] hover:border hover:rounded-md hover:shadow-md bg-white">
    {/* Imagem */}
    <img
      src={`https://picsum.photos/300/200?random=${character.name}`}
      alt={character.name}
      className="w-[115px] h-[130px] self-start sm:w-[432.5px] sm:h-[230px]"
    />

    {/* Conteúdo no Mobile - Nome e Planeta apenas */}
    <div className="flex flex-col h-full justify-start sm:block ml-0 sm:ml-0">
      <h2 className="text-[20px] sm:text-xl font-normal tracking-[1px] text-black">{character.name}</h2>
      <p className="text-[15px] sm:text-base leading-7 tracking-[1px] font-normal text-black">{planetName}</p>

      {/* Detalhes exibidos apenas em telas maiores */}
      <div className="hidden sm:block mt-2">
        <p className="text-sm text-gray-600">Height: {character.height}</p>
        <p className="text-sm text-gray-600">Mass: {character.mass}</p>
        <p className="text-sm text-gray-600">Gender: {character.gender}</p>
      </div>
    </div>
  </div>
  );
};

export default CharacterCard;
