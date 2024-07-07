import React, { ReactNode } from "react";
import styles from "./index.module.css";

type PageSelectorProps = {
  children : ReactNode
  line_color?: string
  line_thickness?: number
}

const PageSelector = ({children, line_color = "black", line_thickness=1}: PageSelectorProps) => {
  const linhaStyle = {
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
