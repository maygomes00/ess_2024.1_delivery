import styles from "./index.module.css";
import { useEffect, useState } from "react";
import ItemBlock from "../../../../shared/components/ItemBlock";
import { loadItens } from "../../../../shared/services/ItensService";
import { Item } from "../../../../shared/types/types";

const ItemPage = ({restaurantId}) => {
  // Variaveis:
  const [restaurantItens, setRestaurantItens] = useState<Item[]>([])

  // Funcoes:
  function test() {
    if (restaurantItens.length > 0) {
      return (<ItemBlock item_info={restaurantItens[0]}/>)
    }
    return <p>Nada</p>
  }

  useEffect(() => {
    const fetchData = async () => {
      if (restaurantId != null && restaurantId != ""){ 
        try {
          const itemRoute: string= "http://localhost:5001/restaurant/menu/item/all/"+restaurantId
          const fetchedItems: Item[] = await loadItens(itemRoute)
          setRestaurantItens(fetchedItems)
        } catch (error) {
            console.error('Error loading items:', error);
        }
      }
    }
    fetchData()
  }, [restaurantId])

  return (
    <section className={styles.container}>
      {test()}
    </section>
  );
};

export default ItemPage;
