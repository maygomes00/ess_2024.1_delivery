import { ReactNode } from "react";
import styles from "./index.module.css";
import CircularButton from "../../../../../../shared/components/CircularButtonCategory";
import { CiEdit } from "react-icons/ci";

type CategoryEditContainerProps = {
  children: ReactNode;
  onEditClick: () => void; // Adiciona a função de clique para editar
};

const CategoryEditContainer = ({ children, onEditClick }: CategoryEditContainerProps) => {
  const buttonSize = "3.5vw";
  const buttonFontSize = "2vw";

  return (
    <div className={styles.container}>
      <div className={styles.categoryContainer}>
        {children}
      </div>
      <div className={styles.editButtonContainer}>
        <CircularButton
          size={buttonSize}
          font_size={buttonFontSize}
          border={2}
          hover_background="#09d321"
          onClick={onEditClick}
        >
          <CiEdit />
        </CircularButton>
      </div>
    </div>
  );
};

export default CategoryEditContainer;
