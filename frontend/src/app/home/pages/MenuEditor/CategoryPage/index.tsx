import styles from "./index.module.css";
import { useEffect, useState } from "react";
import CategoryBlock from "../CategoryBlock";
import { loadCategories, addCategory } from "../../../../../shared/services/CategoriesService";
import { Category } from "../../../../../shared/types/types";
import AddCategoryButton from "./AddCategoryButton";
import CategoryEditContainer from "./CategoryEditContainer";
import AddCategoryPopup from "../../../../../shared/components/AddCategoryPopup";

const CategoryPage = ({ restaurantId }: { restaurantId: string }) => {
  const [restaurantCategories, setRestaurantCategories] = useState<Category[]>([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const fetchCategories = async () => {
    try {
      const fetchedCategories = await loadCategories(restaurantId);
      console.log("Categorias buscadas:", fetchedCategories); // Adicione esta linha
      setRestaurantCategories(fetchedCategories);
    } catch (error) {
      console.error("Error loading categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [restaurantId]);

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const handleAddCategory = async (categoryName: string) => {
    try {
      const newCategory = await addCategory(categoryName, restaurantId);
      setRestaurantCategories((prevCategories) => [...prevCategories, newCategory]);
      closePopup();
      fetchCategories();
    } catch (error) {
      console.error("Erro ao adicionar categoria:", error);
    }
  };

  return (
    <section id="exibidorDeCategorias" className={styles.section}>
      {restaurantCategories.map((category) => (
        <CategoryEditContainer key={category.id}>
          <CategoryBlock categoryName={category.name} />
        </CategoryEditContainer>
      ))}
      <AddCategoryButton onClick={openPopup} />
      <AddCategoryPopup
        isOpen={isPopupOpen}
        onClose={closePopup}
        onAddCategory={handleAddCategory}
        restaurantId={restaurantId}
      />
    </section>
  );
};

export default CategoryPage;
