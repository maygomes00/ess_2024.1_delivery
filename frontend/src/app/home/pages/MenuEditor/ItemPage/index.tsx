import styles from "../MenuEditor.module.css";
import { useEffect, useRef, useState } from "react";
import { loadItens } from "../../../../../shared/services/ItensService";
import { Item } from "../../../../../shared/types/Item";
import AddItemButton from "./AddItemButton";
import ItemEditContainer from "./ItemEditContainer";
import DeletePopup, { DeletePopupMethods } from "./DeletePopup";
import { useNavigate } from "react-router-dom";
import { localContextUpdateInfo } from "../../../context/LocalContext";
import { loadCategories } from "../../../../../shared/services/CategoriesService";

const ItemPage = ({restaurantId}) => {
  const navigate = useNavigate()
  const addPath = `/${restaurantId}/add-item`
  const editPath = `/${restaurantId}/edit-item/`
  const categoriesPath = `/${restaurantId}/menu-editor/categorias`

  // Variaveis:
  const [restaurantItens, setRestaurantItens] = useState<Item[]>([])
  const [reload, setReload] = useState(false)

  // Refs:
  const deletePopupRef = useRef<DeletePopupMethods>(null)

  // Funcoes:
  const createItensContainers = () => {
    return (
    <div className={styles.ShowItens}>
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

  const handleOnClickAdd = async () => {
    let categories = await loadCategories(restaurantId)
    if (categories.length > 0) {
      navigate(addPath)
    }
    else {
      navigate(categoriesPath)
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
    <div id="exibidorDeItens" className={styles.Page}>
      {createItensContainers()}
      <AddItemButton onClick={handleOnClickAdd}/>
      <DeletePopup ref={deletePopupRef} reload={reloadPage} />
    </div>
  );
};

export default ItemPage;
