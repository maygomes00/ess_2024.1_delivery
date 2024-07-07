import React, { useEffect } from "react";
import styles from "./index.module.css";
import ReactDOM from "react-dom";
import { string } from "zod";

type PageBlockProps = {
  elements: Array<JSX.Element>
  index: number
  border?: number
  border_color?: string
}

/*
  Recebe os elementos que devem ser exibidos denro do bloco em uma lista e recebe um indice, 
  exibe no bloco apenas o elemento correspondente ao indice recebido. 
*/
const PageBlock = ({elements, index = -1, border = 2, border_color = "black"}: PageBlockProps) => {
  const linhaStyle = {
    "--border": `${border}px`,
    "--border_color": border_color
  } as React.CSSProperties

  function select_element(elements_list, element_index : number) {
    if ((element_index >= 0) && (element_index < elements_list.length)) {
      return elements_list[element_index]
    }
    else {
      return null
    }
  }

  return(
    <div className={styles.div} style={linhaStyle}>
      {select_element(elements, index )}
    </div>
  )
};

export default PageBlock;
