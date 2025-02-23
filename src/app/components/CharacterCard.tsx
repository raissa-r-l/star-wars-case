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
    <div className=" hover:border hover:rounded-md hover:shadow-md bg-white">
      <img
        src={`https://picsum.photos/300/200?random=${character.name}`}
        alt={character.name}
        className="w-[115px] h-[130px] sm:w-[432.5px] sm:h-[230px]"
      />
      <div className=" h-7 mb-[5px] mt-4">
      <h2 className="text-xl font-normal leading-7 tracking-[1px] text-black">{character.name}</h2>
      </div>
      <div className="h-7 mb-[13px]">
      <p className="text-base leading-7 tracking-[1px] font-normal text-black">{planetName}</p>

      </div>
      <div className="h-4 my-0">
      <p className="text-sm text-gray-600">Height: {character.height}</p>
      </div>
      <div className="h-4 my-0">
      <p className="text-sm text-gray-600">Mass: {character.mass}</p>
      </div>
      <div className="h-4 my-0">
      <p className="text-sm text-gray-600">Gender: {character.gender}</p>
      </div>
    </div>
  );
};

export default CharacterCard;
