import styles from "./index.module.css";
import { ReactElement, useEffect, useState } from "react";
import ItemBlock from "../ItemBlock";
import { loadItens } from "../../../../../shared/services/ItensService";
import { Item } from "../../../../../shared/types/types";
import AddItemButton from "./AddItemButton";
import ItemEditContainer from "./ItemEditContainer";
import ReactDOM from "react-dom";

const ItemPage = ({restaurantId}) => {
  // Variaveis:
  const [restaurantItens, setRestaurantItens] = useState<Item[]>([])

  // Funcoes:
  const createItensContainers = () => {
    return (
    <div>
      {restaurantItens.map((item) => (
        <ItemEditContainer item_info={item} />
      ))}
    </div>
    )
  }

  const restaurantIdValido = () => {
    return restaurantId != null && restaurantId != ""
  }

  useEffect(() => {
    const fetchData = async () => {
      if (restaurantIdValido()){ 
        try {
          const fetchedItems: Item[] = await loadItens(restaurantId)
          setRestaurantItens(fetchedItems)
        } catch (error) {
            console.error('Error loading items:', error);
        }
      }
    }
    fetchData()
  }, [restaurantId])

  return (
    <section id="exibidorDeItens" className={styles.section}>
      {createItensContainers()}
      <AddItemButton />
    </section>
  );
};

export default ItemPage;
