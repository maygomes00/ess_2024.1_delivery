import axios from "axios";
import { Item_back, Item_front } from "../types/types"

// Carrega informacoes dos itens do restaurante, do backend para o front.
export async function loadItens(route: string, image_path: string) {
  const response = await axios.get(route)
  const tempItensList : Item_back[] = response.data
  var itemList :Item_front[] = []
  for (let i = 0; i < tempItensList.length; i++) {
    const backItem: Item_back = tempItensList[i]
    const frontItem: Item_front = convertBackFrontItens(backItem, image_path)
    itemList.push(frontItem)
  }
  return itemList
}

// Converte itens do backend para itens no frontend.
export function convertBackFrontItens(item: Item_back, img_path: string) {
  const item_front: Item_front = {id: item.id,
                                  restaurant_id: item.restaurant_id,
                                  name: item.name,
                                  price: item.price,
                                  description: item.description,
                                  categories: item.categories,
                                  image_path: img_path}
  return item_front
}