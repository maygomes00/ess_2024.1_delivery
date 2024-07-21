import { ReactNode } from "react";
import styles from "./index.module.css";
import CircularButton from "../../../../../../shared/components/CircularButtonCategory";
import { MdClose } from "react-icons/md";
import { CiEdit } from "react-icons/ci";

type CategoryEditContainerProps = {
  children: ReactNode;
  onEditClick: () => void;
  onDeleteClick: () => void;
};

const CategoryEditContainer = ({ children, onEditClick, onDeleteClick }: CategoryEditContainerProps) => {
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
        <CircularButton
          size={buttonSize}
          font_size={buttonFontSize}
          border={2}
          hover_background="#ff4d4d"
          onClick={onDeleteClick}
        >
          <MdClose />
        </CircularButton>
      </div>
    </div>
  );
};

export default CategoryEditContainer;
