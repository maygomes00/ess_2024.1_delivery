import styles from "./index.module.css";
import { Item } from "../../../../../shared/types/types";
import Image64Display from '../../../../../shared/components/Image64Display';

type ItemBlockProps = {
  item_info: Item
}

/*
  
*/
const ItemBlock = ({item_info}: ItemBlockProps) => {
  let {id, restaurant_id, name, price, description, image64} = item_info

  function price_formated(price: string) {
    var new_price = price.replace(".", ",")
    new_price = `R$ ${new_price}`
    return new_price
  }

  return(
    <div className={styles.itemBox}>
      <div className={styles.itemImageContainer}>
        <div className={styles.itemImage}>
          <Image64Display base64_image={image64} alt={"Imagem de "+name} width={"100%"} height={"100%"}/>
        </div>
      </div>
      <div className={styles.itemInfo}>
        <div className={styles.itemInfoTexts}>
          <div className={styles.itemName}>
            <p>{name}</p>
          </div>
          <div className={styles.itemDescription}>
            <p>{description}</p>
          </div>
        </div>
        <div className={styles.itemInfoPrice}>
          <p>{price_formated(price)}</p>
        </div>
      </div>
    </div>
  )
};

export default ItemBlock;
