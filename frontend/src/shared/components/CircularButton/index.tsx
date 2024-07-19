import { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./index.module.css";

type CircularButtonProps = {
  children?: ReactNode
  onClick?: any
  index?: number
  size?: string
  font_size?: string
  border?: number
  color?: string
  background?: string
  hover_color?: string
  hover_background?: string
}

const CircularButton = ({children, onClick, index=0, size="50px", font_size="16px", border=1, color="black", background="white", hover_color="black", hover_background="white"}: CircularButtonProps) => {
  const buttonStyle = {
    "--size": size,
    "--font_size": font_size,
    "--border": `${border}px`,
    "--color": color,
    "--background": background,
    "--hover_color": hover_color,
    "--hover_background": hover_background,
  } as React.CSSProperties

  return (
    <div>
      <button onClick={onClick} className={styles.button} style={buttonStyle}>
        {children}
      </button>
    </div>
  );
};

export default CircularButton;
