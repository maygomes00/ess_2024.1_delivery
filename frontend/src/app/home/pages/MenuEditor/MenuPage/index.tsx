import { useEffect, useState } from "react";
import { Category } from "../../../../../shared/types/category";
import { Item } from "../../../../../shared/types/Item";
import { loadCategories } from "../../../../../shared/services/CategoriesService";
import { loadItens } from "../../../../../shared/services/ItensService";
import styles from "../MenuEditor.module.css";
import CategoryCard from "./CategoryCard";
import ItemButton from "./ItemButton";

type MenuPageProps = {
  restaurantId: string
  onClickItem?: any
}

const MenuPage = ({ restaurantId, onClickItem }: MenuPageProps) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [itens, setItens] = useState<Item[]>([]);

  const showCategories = () => {
    return (
      <div>
        {categories.map((category, index) => (
          <div key={index}>
            {categoryHasItem(category) ? showCategoryAndItens(category) : null} 
          </div>
        ))}
      </div>
    )
  }

  const showCategoryAndItens = (category: Category) => {
    return (
      <div>
        <CategoryCard category={category}></CategoryCard>
        <div className={styles.ShowItens}>
          {itens.map((item) => createItemBlock(category.name, item))}
        </div>
      </div>
    )
  }

  const createItemBlock = (categoryName: string, itemInfo: Item) => {
    if (itemIncludesCategory(categoryName, itemInfo)) {
      return (
        <ItemButton key={itemInfo.id} item_info={itemInfo} onClick={onClickItem}></ItemButton>
      )
    }
    else {
      return (
        null
      )
    }
  }

  const itemIncludesCategory = (categoryName: string, itemInfo: Item) => {
    let itensCategories = itemInfo.categories.split(",")
    return itensCategories.includes(categoryName)
  }

  const categoryHasItem = (category: Category, ) => {
    for  (let item of itens) {
      if (item.categories.split(",").includes(category.name)) {
        return true
      }
    }
    return false  
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
