import { any } from "zod";
import ItemBlock from "../../ItemBlock";
import styles from "../../MenuEditor.module.css"
import { Item } from "../../../../../../shared/types/Item";

type ItemButtonProps = {
  onClick?: any
  item_info: Item 
}

const ItemButton = ({ onClick, item_info }: ItemButtonProps) => {

  return (
    <button onClick={onClick} className={styles.ItemButton}>
      <ItemBlock item_info={item_info}></ItemBlock>
    </button>
  );
};

export default ItemButton;
