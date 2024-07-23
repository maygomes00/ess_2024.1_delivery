import { ReactNode } from "react";
import styles from "./index.module.css";
import CircularButton from "../../../../../shared/components/CircularButton";
import { MdClose } from "react-icons/md";
import { CiEdit } from "react-icons/ci";

type CategoryEditContainerProps = {
  children: ReactNode;
  onEditClick: () => void;
  onDeleteClick: () => void;
  buttonSize?: string;
  buttonFontSize?: string;
  buttonMarginVertical?: string;
};

const CategoryEditContainer = ({
  children,
  onEditClick,
  onDeleteClick,
  buttonSize = "50px",
  buttonFontSize = "30px",
  buttonMarginVertical = "10px",
}: CategoryEditContainerProps) => {
  return (
    <div
      className={styles.container}
      style={{
        "--button-size": buttonSize,
        "--button-font-size": buttonFontSize,
        "--button-margin-vertical": buttonMarginVertical,
      } as React.CSSProperties}
    >
      <div className={styles.categoryContainer}>{children}</div>
      <div className={styles.editButtonContainer}>
        <CircularButton
          size={buttonSize}
          font_size={buttonFontSize}
          border={2}
          hover_background="#008000"
          onClick={onEditClick}
        >
          <CiEdit />
        </CircularButton>
        <CircularButton
          size={buttonSize}
          font_size={buttonFontSize}
          border={2}
          hover_background="#912234"
          onClick={onDeleteClick}
        >
          <MdClose />
        </CircularButton>
      </div>
    </div>
  );
};

export default CategoryEditContainer;
