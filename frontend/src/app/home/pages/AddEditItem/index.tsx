import { useParams } from "react-router-dom";
import styles from "./index.module.css";
import { localContextGetInfo } from "../../context/LocalContext";
import ItemForm from "../../forms/ItemForm";

/*
  Pagina onde são adicionados novos itens no menu do restaurante. 
*/
const AddEditItem = () => {
  // Variaveis:
  const {restaurant_id, page=""} = useParams()

  const canLoadMenuEditor = () => {
    return localContextGetInfo("user", "id") === restaurant_id
  }

  const deniedAccess = () => {
    return (
      <p>Você não tem acesso a essa pagina!</p>
    )
  }

  return( canLoadMenuEditor() ?  <ItemForm /> :  deniedAccess())
};

export default AddEditItem;
