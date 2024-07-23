import { useEffect } from "react";
import { useParams } from "react-router-dom";
import MenuEditorController from "./MenuEditorController";
import { localContextGetInfo } from "../../context/LocalContext";

const MenuEditor = () => {
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

  useEffect(() => {}, [restaurant_id, page])

  return ( canLoadMenuEditor() ? <MenuEditorController /> : deniedAccess()
  );
};

export default MenuEditor;
