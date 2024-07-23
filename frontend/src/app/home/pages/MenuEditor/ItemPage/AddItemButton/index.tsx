import { ButtonHTMLAttributes } from "react";
import styles from "../../MenuEditor.module.css";
import { IoAddCircleOutline } from "react-icons/io5";

type AddButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const AddItemButton = (props: AddButtonProps) => {
  return (
    <button {...props} className={styles.AddButtom}>
      <p>Adicionar item</p>
      <IoAddCircleOutline size={25}/>
    </button>
  );
};

export default AddItemButton;
