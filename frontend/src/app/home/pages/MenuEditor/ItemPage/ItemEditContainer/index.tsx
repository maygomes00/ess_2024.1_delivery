import styles from "./index.module.css";
import CircularButton from "../../../../../../shared/components/CircularButton";
import { MdClose } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import ItemBlock from "../../ItemBlock";
import { Item } from "../../../../../../shared/types/Item";

type ItemEditContainerProps = {
  item_info: Item
  onClickDelete?: any
}

/*
  Conteiner que guarda o bloco do item e os botões de editar e remover. 
*/
const ItemEditContainer = ({ item_info, onClickDelete }: ItemEditContainerProps) => {
  let {id, name} = item_info
  const buttonSize = "3.5vw"
  const buttonFontSize = "2vw"

  const handleOnClickDelete = () => {
    onClickDelete(id, name)
  }

  const handleOnClickEdit = () => {
    return
  }

  return(
    <div className={styles.container}>
        <div className={styles.itemContainer}>
          <ItemBlock item_info={item_info} />
        </div>
        <div className={styles.editButtonContainer}>
          <CircularButton size={buttonSize} font_size={buttonFontSize} border={2} hover_background="#09d321" onClick={handleOnClickEdit}><CiEdit /></CircularButton>
          <CircularButton size={buttonSize} font_size={buttonFontSize} border={2} hover_background="#fc2c2c" onClick={handleOnClickDelete}><MdClose /></CircularButton>
        </div>
      </div>
  )
};

export default ItemEditContainer;
