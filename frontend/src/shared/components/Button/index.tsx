import { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./index.module.css";

type ButtonPros = {
  children?: ReactNode
  onClick?: any
  width?: string
  height?: string
  padding_h?: string
  padding_w?: string
  font_size?: string
  border?: number
  color?: string
  background?: string
  hover_color?: string
  hover_background?: string
}

const Button = ({ children, onClick, width="50px", height="30px", padding_h="opx", padding_w="0px", font_size="16px", border=1, color="black", background="white", hover_color="black", hover_background="white" }: ButtonPros) => {
  const buttonStyle = {
    "--width": width,
    "--height": height,
    "--padding_h": padding_h,
    "--padding_w": padding_w,
    "--font_size": font_size,
    "--border": `${border}px`,
    "--color": color,
    "--background": background,
    "--hover_color": hover_color,
    "--hover_background": hover_background,
  } as React.CSSProperties

  return (
    <button onClick={onClick} className={styles.button} style={buttonStyle}>
      {children}
    </button>
  );
};

export default Button;
