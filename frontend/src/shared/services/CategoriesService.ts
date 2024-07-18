import axios from "axios";
import { Category } from "../types/types";

// Carrega informações das categorias do restaurante, do backend para o front.
export async function loadCategories(restaurantId: string) {
  const route: string = "http://localhost:5001/restaurant/menu/category/all/" + restaurantId;
  const response = await axios.get(route);
  const categoriesList: Category[] = response.data;
  return categoriesList;
}
