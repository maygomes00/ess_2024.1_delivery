import { ButtonHTMLAttributes } from "react";
import styles from "./index.module.css";
import { IoAddCircleOutline } from "react-icons/io5";

type AddButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const AddItemButton = (props: AddButtonProps) => {
  return (
    <button {...props} className={styles.button}>
      <p>Adicionar item</p>
      <IoAddCircleOutline />
    </button>
  );
};

export default AddItemButton;
