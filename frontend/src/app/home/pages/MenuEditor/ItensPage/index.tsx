import styles from "./index.module.css";
import { ReactElement, useEffect, useRef, useState } from "react";
import ItemBlock from "../ItemBlock";
import { loadItens } from "../../../../../shared/services/ItensService";
import { Item } from "../../../../../shared/types/types";
import AddItemButton from "./AddItemButton";
import ItemEditContainer from "./ItemEditContainer";
import DeletePopup, { DeletePopupMethods } from "./DeletePopup";
import ReactDOM from "react-dom";
import { any } from "zod";

const ItemPage = ({restaurantId}) => {
  // Variaveis:
  const [restaurantItens, setRestaurantItens] = useState<Item[]>([])

  // Refs:
  const deletePopupRef = useRef<DeletePopupMethods>(null)

  // Funcoes:
  const createItensContainers = () => {
    return (
    <div>
      {restaurantItens.map((item, index) => (
        <ItemEditContainer key={index} item_info={item} />
      ))}
    </div>
    )
  }

  const restaurantIdValido = () => {
    return restaurantId != null && restaurantId != ""
  }

  const handleOnClickDelete = () => {
    if (deletePopupRef.current) {
      deletePopupRef.current.openDeletePopup();
    }
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
      <AddItemButton onClick={handleOnClickDelete}/>
      <DeletePopup ref={deletePopupRef}/>
    </section>
  );
};

export default ItemPage;
