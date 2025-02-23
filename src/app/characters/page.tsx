// src/app/characters/page.tsx
"use client";
import { useState, useEffect } from "react";
import CharacterList from "../components/CharacterList";
import Filter from "../components/Filter";
import { fetchCharacters } from "../services/api";

export default function CharactersPage() {
  const [selectedPlanet, setSelectedPlanet] = useState("");

  return (
    <div>
      <Filter onFilterChange={setSelectedPlanet} />
      <CharacterList selectedPlanet={selectedPlanet} />
    </div>
  );
}
