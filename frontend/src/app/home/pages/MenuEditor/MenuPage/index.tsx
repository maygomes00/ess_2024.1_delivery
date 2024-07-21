import { useEffect, useState } from "react";
import { Category } from "../../../../../shared/types/category";
import { Item } from "../../../../../shared/types/Item";
import { loadCategories } from "../../../../../shared/services/CategoriesService";
import { loadItens } from "../../../../../shared/services/ItensService";
import styles from "./index.module.css";

const MenuPage = ({ restaurantId }: { restaurantId: string }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [expandedCategoryId, setExpandedCategoryId] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedCategories = await loadCategories(restaurantId);
        setCategories(fetchedCategories);

        // Você pode adicionar a função para buscar itens aqui
        const fetchedItems = await loadItens(restaurantId); // Supondo que exista uma função para carregar itens
        setItems(fetchedItems);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      }
    };

    fetchData();
  }, [restaurantId]);

  const handleToggleCategory = (categoryId: string) => {
    setExpandedCategoryId(expandedCategoryId === categoryId ? null : categoryId);
  };

  return (
    <div className={styles.menuPage}>
      <h1>Menu</h1>
      {categories.map((category) => (
        <div key={category.id} className={styles.category}>
          <h2 onClick={() => handleToggleCategory(category.id)} className={styles.categoryName}>
            {category.name}
            <span className={styles.arrow}>{expandedCategoryId === category.id ? "▲" : "▼"}</span>
          </h2>
          {expandedCategoryId === category.id && (
            <ul className={styles.itemList}>
              {items
                .filter(item => item.categories.split(',').includes(category.id))
                .map(item => (
                  <li key={item.id} className={styles.item}>
                    {item.name}
                  </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

export default MenuPage;
