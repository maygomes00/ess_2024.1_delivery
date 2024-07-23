import { useParams } from "react-router-dom";
import { localContextGetInfo } from "../../context/LocalContext";
import ItemForm from "../../forms/ItemForm";
import { useEffect, useState } from "react";
import { loadItem } from "../../../../shared/services/ItensService";

/*
  Pagina onde são adicionados novos itens no menu do restaurante. 
*/
const AddEditItem = ({type=""}) => {
  // Variaveis:
  const {restaurant_id, item_id=""} = useParams()
  const [canLoad, setCanLoad] = useState(false)

  const canLoadMenuEditor = async (type: string, item_id="") => {
    try {
      if (type === "add") {
        return localContextGetInfo("user", "id") === restaurant_id
      }
      else if (type == "edit" && item_id != "") {
        let item_info = await loadItem(item_id)
        return localContextGetInfo("user", "id") === restaurant_id && item_info.restaurant_id == restaurant_id
      }
      return false
    }
    catch (error) {
      console.error('Error:', error);
      return false
    }
  }

  const deniedAccess = () => {
    return (
      <p>Você não tem acesso a essa pagina!</p>
    )
  }

  useEffect(() => {
    const fetchData = async () => { 
      try {
        if (type == "") {
          type = "add"
        }
        let can = await canLoadMenuEditor(type, item_id)
        setCanLoad(can)
      } catch (error) {
          console.error('Error loading type:', error);
      }
    }
    fetchData()
  }, [restaurant_id, item_id, type, canLoad])

  return( canLoad ?  <ItemForm type={type}/> :  deniedAccess())
};

export default AddEditItem;
