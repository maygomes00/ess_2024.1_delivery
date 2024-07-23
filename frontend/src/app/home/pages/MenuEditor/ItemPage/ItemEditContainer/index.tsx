import styles from "../../MenuEditor.module.css";
import CircularButton from "../../../../../../shared/components/CircularButton";
import { MdClose } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import ItemBlock from "../../ItemBlock";
import { Item } from "../../../../../../shared/types/Item";

type ItemEditContainerProps = {
  item_info: Item
  onClickDelete?: any
  onClickEdit?: any
}

/*
  Conteiner que guarda o bloco do item e os botões de editar e remover. 
*/
const ItemEditContainer = ({ item_info, onClickDelete, onClickEdit }: ItemEditContainerProps) => {
  let {id, name} = item_info

  const handleOnClickDelete = () => {
    onClickDelete(id, name)
  }

  const handleOnClickEdit = () => {
    onClickEdit(id)
  }

  return(
    <div className={styles.ItemEditContainer}>
        <div className={styles.ItemEditContainerItem}>
          <ItemBlock item_info={item_info} />
        </div>
        <div className={styles.ItemEditContainerEditButtons}>
          <CircularButton hover_background="#008000" onClick={handleOnClickEdit}><CiEdit /></CircularButton>
          <CircularButton hover_background="#912234" onClick={handleOnClickDelete}><MdClose /></CircularButton>
        </div>
      </div>
  )
};

export default ItemEditContainer;
