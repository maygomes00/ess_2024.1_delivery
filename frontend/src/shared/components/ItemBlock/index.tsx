import React, { useState } from "react";
import styles from "./index.module.css";
import { Item_front } from "../../types/types";

type ItemBlockProps = {
  item_info: Item_front
}

/*
  
*/
const ItemBlock = ({item_info}: ItemBlockProps) => {
  let {id, restaurant_id, name, price, description, categories, image_path} = item_info
  
  return(
    <div className={styles.itemBox}>
      <div className={styles.itemImage}>
        <img src="" alt="" />
      </div>
      <div className={styles.itemInfo}>
        <p>{name}</p>
        <p>{price}</p>
        <p>{description}</p>
        <p>{categories}</p>
      </div>
    </div>
  )
};

export default ItemBlock;
