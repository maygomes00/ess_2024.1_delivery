import axios from "axios";
import { Category } from "../types/category";

// Carrega informações das categorias do restaurante, do backend para o front.
export async function loadCategories(): Promise<Category[]> {
  try {
    const response = await axios.get(`http://localhost:5001/restaurant/menu/category`);
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

export async function updateCategory(categoryId: string, newName: string): Promise<Category> {
  try {
    const response = await axios.put(`http://localhost:5001/restaurant/menu/category/${categoryId}`, { name: newName });
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar categoria:", error);
    throw error;
  }
}

export const deleteCategory = async (categoryId: string): Promise<void> => {
  try {
    await axios.delete(`http://localhost:5001/restaurant/menu/category/${categoryId}`);
  } catch (error) {
    console.error("Erro ao deletar categoria:", error);
    throw error; // Lançar o erro para que ele possa ser tratado onde a função é chamada
  }
};