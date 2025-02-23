"use client";
import { useState, useEffect } from "react";
import { fetchCharacters } from "../services/api";
import CharacterCard from "./CharacterCard";
import { Character } from "../types/character";

const CharacterList = ({ selectedPlanets }: { selectedPlanets: string[] }) => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [planetsMap, setPlanetsMap] = useState<{ [key: string]: string }>({});
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // Carregar personagens da API
  useEffect(() => {
    setLoading(true);
    fetchCharacters(page).then((data) => {
      setCharacters((prev) => [...prev, ...data.results]);
      setLoading(false);
    });
  }, [page]);

  // Carregar mapa de planetas (URL -> Nome)
  useEffect(() => {
    async function fetchPlanets() {
      const response = await fetch("https://swapi.dev/api/planets/");
      const data = await response.json();
      const newPlanetsMap: { [key: string]: string } = {};
      data.results.forEach((planet: any) => {
        newPlanetsMap[planet.url] = planet.name;
      });
      setPlanetsMap(newPlanetsMap);
    }
    fetchPlanets();
  }, []);

  // Filtrar personagens com base nos planetas selecionados
  const filteredCharacters = selectedPlanets.length
    ? characters.filter((char) => selectedPlanets.includes(planetsMap[char.homeworld] || ""))
    : characters;

  return (
    <div>
      <div className="h-10 mb-[43px] ">
      <h1 className="font-light text-[34px] leading-10 text-[#333333]">All Characters</h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredCharacters.map((char, index) => (
          <CharacterCard key={index} character={char} />
        ))}
      </div>
      <button
        onClick={() => setPage(page + 1)}
        className="bg-blue-500 text-white p-2 rounded-md"
        disabled={loading}
      >
        {loading ? "Loading..." : "Load More"}
      </button>
    </div>
  );
};

export default CharacterList;
