import styles from "./index.module.css";
import { useContext, useEffect, useRef, useState } from "react";
import { loadItens } from "../../../../../shared/services/ItensService";
import { Item } from "../../../../../shared/types/Item";
import AddItemButton from "./AddItemButton";
import ItemEditContainer from "./ItemEditContainer";
import DeletePopup, { DeletePopupMethods } from "./DeletePopup";
import { MainContext } from "../../../context/MainContext";
import { Link } from "react-router-dom";

const ItemPage = ({restaurantId}) => {
  // Variaveis:
  const itemContext = useContext(MainContext).item
  const [itemId, setItemId] = itemContext.selectedId
  const [itemName, setItemName] = itemContext.selectedName
  const [restaurantItens, setRestaurantItens] = useState<Item[]>([])
  const [reload, setReload] = useState(false)

  // Refs:
  const deletePopupRef = useRef<DeletePopupMethods>(null)

  // Funcoes:
  const createItensContainers = () => {
    return (
    <div>
      {restaurantItens.map((item, index) => (
        <ItemEditContainer 
        key={index}
        item_info={item}
        onClickDelete={handleOnClickDelete}
        />
      ))}
    </div>
    )
  }

  const restaurantIdValido = () => {
    return restaurantId != null && restaurantId != ""
  }

  const handleOnClickDelete = (item_id: string, item_nome: string) => {
    if (deletePopupRef.current) {
      deletePopupRef.current.openDeletePopup();
      setItemId(item_id)
      setItemName(item_nome)
    }
  }

  const reloadPage = () => {
    setReload(!reload)
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
  }, [restaurantId, reload])

  return (
    <section id="exibidorDeItens" className={styles.section}>
      {createItensContainers()}
      <Link to={`/${restaurantId}/add_item`} style={{ textDecoration: 'none' }}>
        <AddItemButton />
      </Link>
      <DeletePopup ref={deletePopupRef} reload={reloadPage} />
    </section>
  );
};

export default ItemPage;
