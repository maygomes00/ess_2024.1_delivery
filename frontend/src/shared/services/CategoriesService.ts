import axios from "axios";
import { Category } from "../types/types";

// Carrega informações das categorias do restaurante, do backend para o front.
export async function loadCategories(restaurantId: string): Promise<Category[]> {
  try {
    const response = await axios.get(`http://localhost:5001/restaurant/menu/category`);
    // Mapeia a propriedade 'nome' para 'name'
    const categories: Category[] = response.data.map((cat: any) => ({
      id: cat.id,
      name: cat.nome,
      restauranteId: cat.restauranteId,
      temItens: cat.temItens
    }));
    return categories;
  } catch (error) {
    console.error("Erro ao carregar categorias:", error);
    throw error;
  }
}

// Adiciona uma nova categoria ao restaurante.
export async function addCategory(categoryName: string, restaurantId: string): Promise<Category> {
  const route: string = `http://localhost:5001/restaurant/menu/category`;
  const response = await axios.post(route, { name: categoryName, restaurantId });
  const newCategory: Category = response.data;
  return newCategory;
}