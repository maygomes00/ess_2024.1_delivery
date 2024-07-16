import { ReactNode } from "react";
import styles from "./index.module.css";
import CircularButton from "../../../../../../shared/components/CircularButton";
import { MdClose } from "react-icons/md";
import { CiEdit } from "react-icons/ci";

type ItemEditContainerProps = {
  children: ReactNode
}

/*
  Conteiner que guarda o bloco do item e os botões de editar e remover. 
*/
const ItemEditContainer = ({ children }: ItemEditContainerProps) => {
  const buttonSize = "3.5vw"
  const buttonFontSize = "2vw"

  return(
    <div className={styles.container}>
        <div className={styles.itemContainer}>
          {children}
        </div>
        <div className={styles.editButtonContainer}>
          <CircularButton size={buttonSize} font_size={buttonFontSize} border={2} hover_background="#09d321"><CiEdit /></CircularButton>
          <CircularButton size={buttonSize} font_size={buttonFontSize} border={2} hover_background="#fc2c2c"><MdClose /></CircularButton>
        </div>
      </div>
  )
};

export default ItemEditContainer;
