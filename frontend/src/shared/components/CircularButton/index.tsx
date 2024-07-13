import { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./index.module.css";

type CircularButtonProps = {
  children?: ReactNode
  props?: ButtonHTMLAttributes<HTMLButtonElement>
  index?: number
  size?: string
  font_size?: string
}

const CircularButton = ({children, props, index=0, size="50px", font_size="16px"}: CircularButtonProps) => {
  const buttonStyle = {
    "--size": size,
    "--font_size": font_size,
  } as React.CSSProperties

  return (
    <div>
      <button {...props} className={styles.button} style={buttonStyle}>
        {children}
      </button>
    </div>
  );
};

export default CircularButton;
