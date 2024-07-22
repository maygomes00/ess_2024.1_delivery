import { ButtonHTMLAttributes } from "react";
import styles from "./index.module.css";
import { IoAddCircleOutline } from "react-icons/io5";

type AddButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const AddCategoryButton = (props: AddButtonProps) => {
  return (
    <button {...props} className={`${styles.button} ${styles.addCategoryButton}`}>
      <p>Adicionar categoria</p>
      <IoAddCircleOutline />
    </button>
  );
};

export default AddCategoryButton;
