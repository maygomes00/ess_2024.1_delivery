import styles from "./index.module.css";
import { useEffect, useState } from "react";
import ItemBlock from "../../../../shared/components/ItemBlock";
import { loadItens } from "../../../../shared/services/ItensService";
import { Item_front } from "../../../../shared/types/types";

const ItemPage = ({restaurant_id}) => {
  // Variaveis:
  const [restaurantItens, setRestaurantItens] = useState<Item_front[]>([])

  // Functions:
  function test() {
    if (restaurantItens.length > 0) {
      return (<ItemBlock item_info={restaurantItens[0]}/>)
    }
    return <p>Nada</p>
  }

  useEffect(() => {
    const fetchData = async () => {
      if (restaurant_id != null && restaurant_id != ""){ 
        try {
          const itemRoute: string= "http://localhost:5001/restaurant/menu/item/all/"+restaurant_id
          const fetchedItems: Item_front[] = await loadItens(itemRoute, "")
          setRestaurantItens(fetchedItems)
        } catch (error) {
            console.error('Error loading items:', error);
        }
      }
    }
    fetchData()
  }, [restaurant_id])

  return (
    <section className={styles.container}>
      {test()}
    </section>
  );
};

export default ItemPage;
