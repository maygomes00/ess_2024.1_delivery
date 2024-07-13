import styles from "./index.module.css";
import { useEffect, useState } from "react";
import ItemBlock from "./ItemBlock";
import { loadItens } from "../../../../shared/services/ItensService";
import { Item } from "../../../../shared/types/types";
import CircularButton from "../../../../shared/components/CircularButton";

const ItemPage = ({restaurantId}) => {
  // Variaveis:
  const [restaurantItens, setRestaurantItens] = useState<Item[]>([])

  // Funcoes:
  function test(i:number) {
    if (restaurantItens.length > 0) {
      return (<ItemBlock item_info={restaurantItens[i]}/>)
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
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.itemContainer}>
          {test(0)}
        </div>
        <div className={styles.editButtonContainer}>
          <CircularButton size="3.5vw" font_size="1.5vw">A</CircularButton>
          <CircularButton size="3.5vw" font_size="1.5vw">B</CircularButton>
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.itemContainer}>
          {test(1)}
        </div>
        <div className={styles.editButtonContainer}>
          <CircularButton size="3.5vw" font_size="1.5vw">A</CircularButton>
          <CircularButton size="3.5vw" font_size="1.5vw">B</CircularButton>
        </div>
      </div>
    </section>
    
  );
};

export default ItemPage;
