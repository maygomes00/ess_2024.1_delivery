import axios from "axios"
import { Item } from "../types/Item"

// Carrega informacoes dos itens do restaurante, do backend para o front.
export async function loadItens(restaurantId: string) {
  const route: string= "http://localhost:5001/restaurant/menu/item/all/"+restaurantId
  const response = await axios.get(route)
  const itensList : Item[] = response.data
  return itensList
}

export async function removeItem(itemId: string) {
  const route: string= "http://localhost:5001/restaurant/menu/item/"+itemId
  const response = await axios.delete(route)
  return response.data
}