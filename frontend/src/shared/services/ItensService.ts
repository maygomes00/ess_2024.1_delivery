import axios from "axios";
import { Item } from "../types/Item";

const API_URL = "http://localhost:5001/restaurant/menu/item";

// Carrega informacoes dos itens do restaurante, do backend para o front.
export async function loadItens(restaurantId: string) {
  const route: string =
    "http://localhost:5001/restaurant/menu/item/all/" + restaurantId;
  const response = await axios.get(route);
  const itensList: Item[] = response.data;
  return itensList;
}

// Carrega informacao de Item, dado ID
export const getItemDetails = async (itemId: string): Promise<Item> => {
  const response = await fetch(`${API_URL}/${itemId}/includeInactive`, {
    method: "GET",
  });
  if (!response.ok) {
    throw new Error("Erro ao pegar detalhes do item");
  }
  const item = await response.json();
  return item;
};

export async function removeItem(itemId: string) {
  const route: string = "http://localhost:5001/restaurant/menu/item/" + itemId;
  const response = await axios.delete(route);
  return response;
}

export async function addItem(data) {
  const route: string = "http://localhost:5001/restaurant/menu/item/";
  const response = await axios.post(route, data);
  return response;
}

export async function editItem(data, item_id: string) {
  const route: string = "http://localhost:5001/restaurant/menu/item/" + item_id;
  const response = await axios.put(route, data);
  return response;
}
