import { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./index.module.css";

interface SelectorButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  selected?: Boolean
  font_size?: number
  side_padding?: number
  line_size?: number
  width?: string
  color?: string
}

/*
  Botão para ser usado no PageSelector; quando selected = true, 
*/
const SelectorButton = ({ children, selected=false, ...buttonProps }: SelectorButtonProps) => {
  // Retorna o estilo do botão de acordo com ele está selecionado ou não.
  function set_button_style(is_selected) {
    if (is_selected) {
      return `${styles.SelectorButton} ${styles.SelectorButton_selected}`
    }
    else {
      return styles.SelectorButton
    }
  }

  return (
    <button {...buttonProps} className={set_button_style(selected)}>
      {children}
    </button>
  );
};

export default SelectorButton;
