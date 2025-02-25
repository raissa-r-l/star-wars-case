"use client";
import { useState, useEffect } from "react";
import { fetchCharacters } from "../services/api";
import CharacterCard from "./CharacterCard";
import { Character } from "../types/character";
import Image from "next/image";

const ITEMS_PER_PAGE_DEFAULT = 8; 
const ITEMS_PER_PAGE_4K = 6; 

const CharacterList = ({ selectedPlanets }: { selectedPlanets: string[] }) => {
  const [planetsMap, setPlanetsMap] = useState<{ [key: string]: string }>({});
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [allCharacters, setAllCharacters] = useState<Character[]>([]); 
  const [itemsPerPage, setItemsPerPage] = useState(ITEMS_PER_PAGE_DEFAULT); 

  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth >= 2000) {
        setItemsPerPage(ITEMS_PER_PAGE_4K);
      } else {
        setItemsPerPage(ITEMS_PER_PAGE_DEFAULT);
      }
    };

    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  useEffect(() => {
    setLoading(true);
    fetchCharacters(page).then((data) => {
      setAllCharacters((prev) => [...prev, ...data.results]);
      setLoading(false);
    });
  }, [page]);

  useEffect(() => {
    async function fetchPlanets() {
      const response = await fetch("https://swapi.dev/api/planets/");
      const data = await response.json();
      const newPlanetsMap: { [key: string]: string } = {};
      data.results.forEach((planet: { url: string; name: string }) => {
        newPlanetsMap[planet.url] = planet.name;
      });
      setPlanetsMap(newPlanetsMap);
    }
    fetchPlanets();
  }, []);

  const filteredCharacters = selectedPlanets.length
    ? allCharacters.filter((char) => selectedPlanets.includes(planetsMap[char.homeworld] || ""))
    : allCharacters;

  const displayedCharacters = filteredCharacters.slice(0, page * itemsPerPage);


  return (
    <div>
      <div className="h-10 mb-[43px]">
        <h1 className="font-light text-[34px] leading-10 text-[#333333]">All Characters</h1>
      </div>
      {displayedCharacters.length > 0 ? (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl4k:grid-cols-6 gap-4">
    {displayedCharacters.map((char, index) => (
      <CharacterCard key={index} character={char} />
    ))}
  </div>
      ):(    <div className="flex flex-col items-center justify-center text-center mt-20">
        <Image
          src="https://img.icons8.com/?size=100&id=1eGeikx9BzTw&format=png&color=000000"
          alt="Yoda"
          width={128}
          height={128}
          className="w-32 h-32 mb-4 opacity-80"
        />
        <p className="text-xl font-semibold text-gray-600">
          "Find no characters, you have. Patience must be."
        </p>
        <p className="text-gray-500 mt-2 mb-5">Try another filter, you should.</p>
      </div>)}
  
      <div className="w-full h-12 flex items-center justify-center">
        <button
          onClick={() => setPage(page + 1)}
          className="border-[1px] border-[#002B53] w-[196.02px] pr-[55.41px] pl-[55.61px] md:w-[486.02px] h-12 py-[1px] md:pr-[200.41px] md:pl-[200.61px]"
          disabled={loading || displayedCharacters.length >= filteredCharacters.length}
        >
          {loading ? "Loading..." : "Load More"}
        </button>
      </div>
    </div>
  );
};

export default CharacterList;
