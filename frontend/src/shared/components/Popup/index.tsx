import { ReactNode } from "react";
import styles from "./index.module.css";

type PopupProps = {
  children?: ReactNode
  id?: string
  visible?: boolean
}

/*
  Popup que aparece no centro da tela enm cima de todos os elementos.
*/
const Popup = ({ children, id="", visible=true }: PopupProps) => {
  const setDisplayMode = (visible: boolean) => {
    if (visible) {
      return "block"
    }
    else {
      return "none"
    }
  }

  const popupStyle = {
    "--visible": setDisplayMode(visible)
  } as React.CSSProperties

  return(
    <div id={id} className={styles.popup} style={popupStyle}>
      <div className={styles.popupContent}>
        {children}
      </div>
    </div>
  )
};

export default Popup;
