import styles from "./index.module.css";
import { useState } from "react";
import PageSelector from "../../../../shared/components/PageSelector";
import PageBlock from "../../../../shared/components/PageBlock";
import CreateTest from "../CreateTest";
import ListTests from "../ListTests";
import SelectorButton from "../../../../shared/components/SelectorButton";
import ItemPage from "./ItensPage";
import { useParams } from "react-router-dom";

const MenuEditor = () => {
  // Variaveis:
  const {restaurant_id} = useParams()
  const [blockIndex, setBlockIndex] = useState(0)

  return (
    <section className={styles.container}>
      <PageSelector line_size={120} line_thickness={2} line_element_gap={0} line_color="gray">
        <SelectorButton onClick={() => setBlockIndex(0)} selected={true} font_size={20} color="#EC7063"> AAAAA </SelectorButton>
        <SelectorButton onClick={() => setBlockIndex(1)} selected={false} font_size={20} color="#EC7063"> BBBBB </SelectorButton>
        <SelectorButton onClick={() => setBlockIndex(2)} selected={false} font_size={20} color="#EC7063"> CCCCC </SelectorButton>
      </PageSelector>
      <PageBlock
        elements={[<CreateTest />, <ItemPage restaurantId={restaurant_id} />, <ListTests />]} 
        index={blockIndex}
        border={0}
      />
    </section>
  );
};

export default MenuEditor;
