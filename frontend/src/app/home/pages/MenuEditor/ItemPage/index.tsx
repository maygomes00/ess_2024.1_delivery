import styles from "./index.module.css";
import { useEffect, useRef, useState } from "react";
import { loadItens } from "../../../../../shared/services/ItensService";
import { Item } from "../../../../../shared/types/Item";
import AddItemButton from "./AddItemButton";
import ItemEditContainer from "./ItemEditContainer";
import DeletePopup, { DeletePopupMethods } from "./DeletePopup";
import { useNavigate } from "react-router-dom";
import { localContextUpdateInfo } from "../../../context/LocalContext";

const ItemPage = ({restaurantId}) => {
  const navigate = useNavigate()
  const addPath = `/${restaurantId}/add-item`
  const editPath = `/${restaurantId}/edit-item/`

  // Variaveis:
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
        onClickEdit={handleOnClickEdit}
        />
      ))}
    </div>
    )
  }

  const restaurantIdValido = () => {
    return restaurantId != null && restaurantId != ""
  }

  const handleOnClickDelete = (item_id: string, item_name: string) => {
    if (deletePopupRef.current) {
      deletePopupRef.current.openDeletePopup();
      localContextUpdateInfo("item", "id", item_id)
      localContextUpdateInfo("item", "name", item_name)
    }
  }

  const handleOnClickEdit= (item_id: string) => {
    navigate(editPath + item_id)
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
      <AddItemButton onClick={() => {navigate(addPath)}}/>
      <DeletePopup ref={deletePopupRef} reload={reloadPage} />
    </section>
  );
};

export default ItemPage;
