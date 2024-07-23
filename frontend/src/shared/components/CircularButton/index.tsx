import { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./index.module.css";

type CircularButtonProps = {
  children?: ReactNode
  onClick?: any
  hover_background?: string
}

const CircularButton = ({children, onClick, hover_background="white"}: CircularButtonProps) => {
  const buttonStyle = {
    "--hover_background": hover_background,
  } as React.CSSProperties

  return (
    <div>
      <button onClick={onClick} className={styles.CircularButton} style={buttonStyle}>
        {children}
      </button>
    </div>
  );
};

export default CircularButton;
