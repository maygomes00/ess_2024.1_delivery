import styles from "./index.module.css";
import { useContext, useEffect, useState } from "react";
import { MainContext } from "../../context/MainContext";
import PageSelector from "../../../../shared/components/PageSelector";
import PageBlock from "../../../../shared/components/PageBlock";
import CreateTest from "../CreateTest";
import ListTests from "../ListTests";
import SelectorButton from "../../../../shared/components/SelectorButton";
import ItemBlock from "../../../../shared/components/ItemBlock";
import { loadItens } from "../../../../shared/services/ItensService";
import { Item_front } from "../../../../shared/types/types";

const ItemPage = () => {
  // Contexto:
  const userContext = useContext(MainContext).user
  const [id, setId] = userContext.id

  // Variaveis:
  const [blockIndex, setBlockIndex] = useState(0)
  const [restaurantItens, setRestaurantItens] = useState<Item_front[]>([])

  // Functions:
  function test() {
    if (restaurantItens.length > 0) {
      return (<ItemBlock item_info={restaurantItens[0]}/>)
    }
    return <p>Nada</p>
  }

  useEffect(() => {
    setId("123")
    const fetchData = async () => {
      if (id != ""){
        try {
          const itemRoute: string= "http://localhost:5001/restaurant/menu/item/all/"+id
          console.log(id)
          console.log(itemRoute)
          const fetchedItems: Item_front[] = await loadItens(itemRoute, "")
          setRestaurantItens(fetchedItems)
        } catch (error) {
            console.error('Error loading items:', error);
        }
      }
    }
    fetchData()
  }, [id])

  return (
    <section className={styles.container}>
      <PageSelector line_size={120} line_thickness={2} line_element_gap={0} line_color="gray">
        <SelectorButton onClick={() => setBlockIndex(0)} selected={true} font_size={20} color="#EC7063"> AAAAA </SelectorButton>
        <SelectorButton onClick={() => setBlockIndex(1)} selected={false} font_size={20} color="#EC7063"> BBBBB </SelectorButton>
        <SelectorButton onClick={() => setBlockIndex(2)} selected={false} font_size={20} color="#EC7063"> CCCCC </SelectorButton>
      </PageSelector>
      {test()}
      <PageBlock
        elements={[CreateTest(), ListTests()]} 
        index={blockIndex}
        border={0}
      />
    </section>
  );
};

export default ItemPage;
