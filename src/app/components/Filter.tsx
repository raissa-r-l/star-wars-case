"use client";
import { useState, useEffect } from "react";
import { fetchPlanets } from "../services/api";

const Filter = ({ onFilterChange }: { onFilterChange: (planets: string[]) => void }) => {
  const [planets, setPlanets] = useState<string[]>([]);
  const [selectedPlanets, setSelectedPlanets] = useState<string[]>(["All"]);

  useEffect(() => {
    fetchPlanets().then((data) => {
      setPlanets(data.results.map((planet: { name: string }) => planet.name));
    });
  }, []);

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedPlanet: string = event.target.value;

    if (selectedPlanet === "All") {
      setSelectedPlanets(["All"]); 
    } else {
      setSelectedPlanets((prev) =>
        prev.includes(selectedPlanet)
          ? prev.filter((p) => p !== selectedPlanet)
          : [...prev.filter((p) => p !== "All"), selectedPlanet]
      );
    }
  };

  const removeFilter = (planet: string) => {
    setSelectedPlanets((prev) => {
      const updatedFilters = prev.filter((p) => p !== planet);
      return updatedFilters.length === 0 ? ["All"] : updatedFilters;
    });
  };

  const clearFilters = () => {
    setSelectedPlanets(["All"]);
  };

  useEffect(() => {
    onFilterChange(selectedPlanets.includes("All") ? [] : selectedPlanets);
  }, [selectedPlanets, onFilterChange]);

  return (
    <div className="py-4 flex flex-col mb-[50px] md:flex-row items-center justify-start sm:justify-between bg-white border-gray-300 border-t md:border-b">
      <div className="flex items-center space-x-4 w-max sm:w-[390px] self-start md:self-auto md:ml-0">
        <label className="text-[#666666] font-medium">Filter by:</label>
        <select
          onChange={handleFilterChange}
          className="border-0 border-b-2 border-gray-400 min-w-[150px] sm:min-w-[200px] outline-none max-w-[240px] p-2 shadow-sm bg-white text-[#002B56] focus:ring-0 focus:border-blue-500"
        >
          <option value="All" className="text-[#002B56]">All</option>
          {planets.map((planet, index) => (
            <option key={index} value={planet} className="text-[#002B56]">
              {planet}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
        {selectedPlanets.map((planet) =>
          planet !== "All" ? (
            <div key={planet} className="flex items-center border border-gray-400 px-4 py-2 text-gray-500 text-sm hover:bg-gray-100 transition">
              {planet}
              <button onClick={() => removeFilter(planet)} className="ml-2 text-red-500">✕</button>
            </div>
          ) : null
        )}
      </div>

      <button
        onClick={clearFilters}
        className="hidden md:block border border-gray-400 px-4 py-2 text-gray-500 text-sm hover:bg-gray-100 transition"
      >
        Clear All
      </button>
    </div>
  );
};

export default Filter;
