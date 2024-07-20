import { useContext} from "react";
import { useParams } from "react-router-dom";
import { MainContext } from "../../context/MainContext";
import MenuEditorController from "./MenuEditorController";

const MenuEditor = () => {
  // Variaveis:
  const userContext = useContext(MainContext).user
  const [userId, setUserId] = userContext.id
  const {restaurant_id, page=""} = useParams()

  const canLoadMenuEditor = () => {
    return userId === restaurant_id
  }

  const deniedAccess = () => {
    return (
      <p>Você não tem acesso a essa pagina!</p>
    )
  }

  return ( canLoadMenuEditor() ? <MenuEditorController /> : deniedAccess()
  );
};

export default MenuEditor;
