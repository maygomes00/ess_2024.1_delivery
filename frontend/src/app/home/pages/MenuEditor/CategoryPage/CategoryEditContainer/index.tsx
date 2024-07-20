import { ReactNode } from "react";
import styles from "./index.module.css";
import CircularButton from "../../../../../../shared/components/CircularButton";
import { MdClose } from "react-icons/md";
import { CiEdit } from "react-icons/ci";

type CategoryEditContainerProps = {
  children: ReactNode;
};

/*
  Contêiner que guarda o bloco da categoria e os botões de editar e remover.
*/
const CategoryEditContainer = ({ children }: CategoryEditContainerProps) => {
  const buttonSize = "3.5vw";
  const buttonFontSize = "2vw";

  return (
    <div className={styles.container}>
      <div className={styles.categoryContainer}>
        {children}
      </div>
      <div className={styles.editButtonContainer}>
        <CircularButton size={buttonSize} font_size={buttonFontSize} border={2} hover_background="#09d321">
          <CiEdit />
        </CircularButton>
        <CircularButton size={buttonSize} font_size={buttonFontSize} border={2} hover_background="#fc2c2c">
          <MdClose />
        </CircularButton>
      </div>
    </div>
  );
};

export default CategoryEditContainer;
