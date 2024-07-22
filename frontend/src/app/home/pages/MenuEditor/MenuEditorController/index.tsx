import styles from "./index.module.css";
import { useEffect, useState } from "react";
import PageSelector from "../../../../../shared/components/PageSelector";
import PageBlock from "../../../../../shared/components/PageBlock";
import SelectorButton from "../../../../../shared/components/SelectorButton";
import ItemPage from "../ItemPage";
import { Link, useParams } from "react-router-dom";
import CategoryPage from "../CategoryPage";
import MenuPage from "../MenuPage";


const MenuEditorController = () => {
  // Constantes:
  const button_size = "fit-content"
  const button_font = 20
  const selected_color = "#EC7063"
  const buttons_side_padding = 25

  // Variaveis:
  const {restaurant_id, page=""} = useParams()
  const [blockIndex, setBlockIndex] = useState(0)

  // Funcao:
  const changePage = (page: string) => {
    return `/${restaurant_id}/menu-editor/${page}`
  }

  const setSelectedButton = (button_id: number) => {
    return button_id === blockIndex
  }

  useEffect(() => {
    switch(`/${restaurant_id}/menu-editor/${page}`){
      case(`/${restaurant_id}/menu-editor`):
        setBlockIndex(0)
        break
      case(`/${restaurant_id}/menu-editor/menu`):
        setBlockIndex(0)
        break
      case(`/${restaurant_id}/menu-editor/itens`):
        setBlockIndex(1)
        break
      case(`/${restaurant_id}/menu-editor/categorias`):
        setBlockIndex(2)
        break
    }
  }, [restaurant_id, page, blockIndex])

  return (
    <div className={styles.section}>
      <div className={styles.container}>
        <PageSelector line_size={120} line_thickness={2} line_element_gap={0} line_color="gray">
          <Link to={changePage("menu")}>
            <SelectorButton selected={setSelectedButton(0)} font_size={button_font}
              width={button_size} side_padding={buttons_side_padding} color={selected_color}> Menu </SelectorButton>
          </Link>
          <Link to={changePage("itens")}>
            <SelectorButton selected={setSelectedButton(1)} font_size={button_font}
            width={button_size} side_padding={buttons_side_padding} color={selected_color}> Itens </SelectorButton>
          </Link>
          <Link to={changePage("categorias")}>
            <SelectorButton selected={setSelectedButton(2)} font_size={button_font}
            width={button_size} side_padding={buttons_side_padding} color={selected_color}> Categorias </SelectorButton>
          </Link>
        </PageSelector>
        <PageBlock
          elements={[<MenuPage restaurantId={restaurant_id} />, <ItemPage restaurantId={restaurant_id} />, <CategoryPage restaurantId={restaurant_id || ''} />]} 
          index={blockIndex}
          border={0}
        />
      </div>
    </div>
  )
};

export default MenuEditorController;
