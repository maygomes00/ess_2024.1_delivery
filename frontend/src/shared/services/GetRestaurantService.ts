import { Restaurant } from "../../shared/types/Restaurant";

const API_URL = "http://localhost:5001/restaurant/";

export const getRestaurant = async (id: string): Promise<Restaurant> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "GET",
  });
  if (!response.ok) {
    throw new Error("Erro ao pegar restaurante");
  }
  const result = await response.json();
  return result;
};
