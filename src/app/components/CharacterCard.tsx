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
    <img
      src={`https://picsum.photos/300/200?random=${character.name}`}
      alt={character.name}
      className="w-[115px] h-[130px] self-start sm:w-[432.5px] sm:h-[230px]"
    />

    <div className="flex flex-col h-full justify-start sm:block ml-0 sm:ml-0">
      <div className=" sm:h-7 mb-[5px] sm:mt-4">
        <h2 className="text-[20px] sm:text-xl font-normal tracking-[1px] text-black">{character.name}</h2>
      </div>
      <div className="h-7 sm:mb-[13px]">
        <p className="text-[15px] sm:text-base leading-7 tracking-[1px] font-normal text-black">{planetName}</p>
      </div>
      <div className="hidden sm:block mt-2">
      <div className="h-4 my-0">
      <p className="text-[12px] leading-4 tracking-[0.5px] text-[#757575]">HEIGHT • {character.height}</p>
      </div>
      <div className="h-4 my-0">
      <p className="text-[12px] leading-4 tracking-[0.5px] text-[#757575]">MASS • {character.mass}</p>
      </div>
      <div className="h-4 my-0">
      <p className="text-[12px] leading-4 tracking-[0.5px] text-[#757575]">GENDER • {character.gender}</p>
      </div>
      </div>
    </div>
  </div>
  );
};

export default CharacterCard;
