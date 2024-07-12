import axios from "axios"
import { Item } from "../types/types"

// Carrega informacoes dos itens do restaurante, do backend para o front.
export async function loadItens(route: string) {
  const response = await axios.get(route)
  const itensList : Item[] = response.data
  return itensList
}