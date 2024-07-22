import React, { ReactNode, useEffect, useState } from "react";
import styles from "./index.module.css";

type PageSelectorProps = {
  children: ReactNode
  line_size?: number
  line_color?: string
  line_thickness?: number
  line_element_gap?: number
}

/*
  Campo de seleção, pode receber elementos para cerem selecionados e a linha de separação em baixo
  ajusta seu tamanho dinamicamente.
*/
const PageSelector = ({children}: PageSelectorProps) => {

  return (
    <section className={styles.PageSelector}>
      <div className={styles.buttonContainer}>
        { children }
      </div>
      <div className={styles.linha}/>
    </section>
  );
};

export default PageSelector;
