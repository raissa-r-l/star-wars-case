"use client";
import { useState } from "react";
import Head from "next/head";
import Filter from "./components/Filter";
import CharacterList from "./components/CharacterList";
import Header from "./components/Header";

export default function Home() {
  const [selectedPlanets, setSelectedPlanets] = useState<string[]>([]);

  return (
    <>
      <Head>
        <title>Star Wars Characters</title>
      </Head>
      <main className="">
        <Header />
        <Filter onFilterChange={setSelectedPlanets} />
        <CharacterList selectedPlanets={selectedPlanets} />
      </main>
    </>
  );
}
