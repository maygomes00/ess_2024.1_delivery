import styles from "../MenuEditor.module.css";
import { Item } from "../../../../../shared/types/Item";
import Image64Display from '../../../../../shared/components/Image64Display';

type ItemBlockProps = {
  item_info: Item
}

/*
  Bloco que exibe o item, suas informações e imagem.
*/
const ItemBlock = ({item_info}: ItemBlockProps) => {
  let {name, price, description, image64} = item_info

  function price_formated(price: string) {
    var new_price = price.replace(".", ",")
    new_price = `R$ ${new_price}`
    return new_price
  }

  return(
    <div className={styles.ItemBox}>
      <div className={styles.ItemSpace}>
        <div className={styles.ItemBoxItemImageContainer}>
          <div className={styles.ItemBoxItemImage}>
            <Image64Display base64_image={image64} alt={"Imagem de "+name} width={"100%"} height={"100%"}/>
          </div>
        </div>
      </div>
      <div className={styles.ItemInfo}>
        <div className={styles.ItemInfoTexts}>
          <p className={styles.ItemName}>{name}</p>
          <p className={styles.ItemDescription}>{description}</p>
        </div>
        <div className={styles.ItemInfoPrice}>
          <p>{price_formated(price)}</p>
        </div>
      </div>
    </div>
  )
};

export default ItemBlock;
