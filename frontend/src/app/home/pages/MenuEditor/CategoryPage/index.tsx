import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import CategoryBlock from "../CategoryBlock";
import { loadCategories, addCategory, updateCategory } from "../../../../../shared/services/CategoriesService";
import { Category } from "../../../../../shared/types/types";
import AddCategoryButton from "./AddCategoryButton";
import CategoryEditContainer from "./CategoryEditContainer";
import AddCategoryPopup from "../../../../../shared/components/AddCategoryPopup";
import EditCategoryPopup from "../../../../../shared/components/EditCategoryPopup"; // Novo popup de edição

const CategoryPage = ({ restaurantId }: { restaurantId: string }) => {
  const [restaurantCategories, setRestaurantCategories] = useState<Category[]>([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);

  const fetchCategories = async () => {
    try {
      const fetchedCategories = await loadCategories(restaurantId);
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

  const openEditPopup = (category: Category) => {
    setCurrentCategory(category);
    setIsEditPopupOpen(true);
  };

  const closeEditPopup = () => {
    setIsEditPopupOpen(false);
    setCurrentCategory(null);
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

  const handleEditCategory = async (categoryId: string, newName: string) => {
    try {
      await updateCategory(categoryId, newName);
      closeEditPopup();
      fetchCategories();
    } catch (error) {
      console.error("Erro ao atualizar categoria:", error);
    }
  };

  return (
    <section id="exibidorDeCategorias" className={styles.section}>
      {restaurantCategories.map((category) => (
        <CategoryEditContainer key={category.id} onEditClick={() => openEditPopup(category)}>
          <CategoryBlock categoryName={category.name} />
        </CategoryEditContainer>
      ))}
      <AddCategoryButton onClick={openPopup} />
      <AddCategoryPopup
        isOpen={isPopupOpen}
        onClose={closePopup}
        onAddCategory={handleAddCategory}
        restaurantId={restaurantId}
        existingCategories={restaurantCategories}
      />
      {currentCategory && (
        <EditCategoryPopup
          isOpen={isEditPopupOpen}
          onClose={closeEditPopup}
          category={currentCategory}
          onEditCategory={handleEditCategory}
          existingCategories={restaurantCategories}
        />
      )}
    </section>
  );
};

export default CategoryPage;
