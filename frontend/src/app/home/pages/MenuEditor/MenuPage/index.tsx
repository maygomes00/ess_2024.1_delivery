import { useEffect, useState } from "react";
import { Category } from "../../../../../shared/types/category";
import { Item } from "../../../../../shared/types/Item";
import { loadCategories } from "../../../../../shared/services/CategoriesService";
import { loadItens } from "../../../../../shared/services/ItensService";
import styles from "../MenuEditor.module.css";
import CategoryCard from "./CategoryCard";
import ItemBlock from "../ItemBlock";

const MenuPage = ({ restaurantId }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [itens, setItens] = useState<Item[]>([]);

  const showCategories = () => {
    return (
      <div>
        {categories.map((category) => (
          <div>
            <CategoryCard category={category}></CategoryCard>
            <div>
              {showItens(category.name)}
            </div>
          </div>
        ))}
      </div>
    )
  }

  const showItens = (categoryName: string) => {
    return (
      <div className={styles.ShowItens}>
        {itens.map((item) => createItemBlock(categoryName, item))}
      </div>
    )
  }

  const createItemBlock = (categoryName: string, itemInfo: Item) => {
    let itensCategories = itemInfo.categories.split(",")
    if (itensCategories.includes(categoryName)) {
      return (
        <ItemBlock item_info={itemInfo}></ItemBlock>
      )
    }
    else {
      return (
        <div></div>
      )
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      if (restaurantId) {
        try {
          const fetchedCategories = await loadCategories(restaurantId);
          setCategories(fetchedCategories);
  
          // Você pode adicionar a função para buscar itens aqui
          const fetchedItens = await loadItens(restaurantId); // Supondo que exista uma função para carregar itens
          setItens(fetchedItens);
        } catch (error) {
          console.error("Erro ao carregar dados:", error);
        }
      }
    };
    fetchData();
  }, [restaurantId]);

  return (
    <div className={styles.Page}>
      {showCategories()}
    </div>
  );
};

export default MenuPage;
