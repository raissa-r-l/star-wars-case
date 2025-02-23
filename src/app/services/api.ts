const BASE_URL = "https://swapi.dev/api";

export const fetchCharacters = async (page: number = 1) => {
  const response = await fetch(`${BASE_URL}/people/?page=${page}`);
  if (!response.ok) throw new Error("Erro ao buscar personagens");
  return response.json();
};

export const fetchPlanets = async () => {
  const response = await fetch(`${BASE_URL}/planets/`);
  if (!response.ok) throw new Error("Erro ao buscar planetas");
  return response.json();
};
