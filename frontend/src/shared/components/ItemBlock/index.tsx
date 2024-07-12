import React, { useState, useEffect } from 'react';
import { createCanvas } from 'canvas'
import styles from "./index.module.css";
import { Item } from "../../types/types";
import Image64Display from '../Image64Display';

type ItemBlockProps = {
  item_info: Item
}

/*
  
*/
const ItemBlock = ({item_info}: ItemBlockProps) => {
  let {id, restaurant_id, name, price, description, categories, image64} = item_info

  return(
    <div className={styles.itemBox}>
      <div className={styles.itemImage}>
        <Image64Display base64_image={image64} alt={"Imagem de "+name}/>
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
