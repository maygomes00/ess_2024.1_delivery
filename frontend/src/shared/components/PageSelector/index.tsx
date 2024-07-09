import React, { ReactNode, useEffect, useState } from "react";
import styles from "./index.module.css";

type PageSelectorProps = {
  children : ReactNode
  line_size?: number
  line_color?: string
  line_thickness?: number
}

/*
  Campo de seleção, pode receber elementos para cerem selecionados e a linha de separação em baixo
  ajusta seu tamanho dinamicamente.
*/
const PageSelector = ({children, line_size = 100, line_color = "black", line_thickness=1}: PageSelectorProps) => {
  const [line_trastransform_x, setLineTrastransformX] = useState(0)

  useEffect(() => {
    // Calcula o quanto que a linha será movida para ser centralizada, de acordo com seu tamanho.
    const over_size = line_size - 100
    setLineTrastransformX(-(100*(over_size/2)/ line_size))
  }, [line_size])

  const linhaStyle = {
    "--line_size": `${line_size}%`,
    "--line_trastransform_x": `${line_trastransform_x}%`,
    "--line-color": line_color,
    "--line-thickness": `${line_thickness}px`
  } as React.CSSProperties

  return (
    <section className={styles.section}>
      <div className={styles.div}>
        { children }
      </div>
      <div className={styles.linha} style={linhaStyle}/>
    </section>
  );
};

export default PageSelector;
