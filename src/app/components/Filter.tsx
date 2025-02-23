"use client";
import { useState, useEffect } from "react";
import { fetchPlanets } from "../services/api";

const Filter = ({ onFilterChange }: { onFilterChange: (planets: string[]) => void }) => {
  const [planets, setPlanets] = useState<string[]>([]);
  const [selectedPlanets, setSelectedPlanets] = useState<string[]>([]);

  useEffect(() => {
    fetchPlanets().then((data) => {
      setPlanets(data.results.map((planet: any) => planet.name));
    });
  }, []);

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedPlanet = event.target.value;
    
    if (!selectedPlanet) return;

    setSelectedPlanets((prev) =>
      prev.includes(selectedPlanet) ? prev.filter((p) => p !== selectedPlanet) : [...prev, selectedPlanet]
    );
  };

  const removeFilter = (planet: string) => {
    setSelectedPlanets((prev) => prev.filter((p) => p !== planet));
  };

  const clearFilters = () => {
    setSelectedPlanets([]);
  };

  useEffect(() => {
    onFilterChange(selectedPlanets);
  }, [selectedPlanets]);

  return (
    <div className="border-t border-b border-gray-300 py-4 px-6 flex flex-col mb-[50px] md:flex-row items-center justify-between bg-white">
      <div className="flex items-center space-x-4">
        <label className="text-[#666666] font-medium">Filter by:</label>
        <select
          onChange={handleFilterChange}
         // className="border border-gray-300 min-w-[200px] max-w-[240px] p-2 shadow-sm bg-white focus:ring focus:ring-blue-200"
         className="border-0 border-b-2 border-gray-400 min-w-[200px] outline-none max-w-[240px] p-2 shadow-sm bg-white text-[#002B56] focus:ring-0 focus:border-blue-500"
        >
          <option value="" className="text-[#002B56]">All</option>
          {planets.map((planet, index) => (
            <option key={index} value={planet} className="text-[#002B56]">
              {planet}
            </option>
          ))}
        </select>
      </div>

      {/* Filtros Selecionados */}
      <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
        {selectedPlanets.map((planet) => (
          <div key={planet} className="flex items-center bg-gray-200 px-3 py-1 rounded-full text-sm">
            {planet}
            <button onClick={() => removeFilter(planet)} className="ml-2 text-red-500">✕</button>
          </div>
        ))}
      </div>

      {/* Botão "Clear All" */}
      <button
        onClick={clearFilters}
        className="border border-gray-400 px-4 py-2 text-gray-500 text-sm hover:bg-gray-100 transition"
      >
        Clear All
      </button>
    </div>
  );
};

export default Filter;
