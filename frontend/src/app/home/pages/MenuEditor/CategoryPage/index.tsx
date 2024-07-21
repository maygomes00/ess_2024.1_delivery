import { useEffect, useState } from "react";
import styles from "./index.module.css";
import CategoryBlock from "../CategoryBlock";
import { loadCategories, addCategory, updateCategory, deleteCategory } from "../../../../../shared/services/CategoriesService";
import { Category } from "../../../../../shared/types/types";
import AddCategoryButton from "./AddCategoryButton";
import CategoryEditContainer from "./CategoryEditContainer";
import AddCategoryPopup from "../../../../../shared/components/AddCategoryPopup";
import EditCategoryPopup from "../../../../../shared/components/EditCategoryPopup";
import ConfirmationPopup from "../../../../../shared/components/ConfirmationPopup/ConfirmationPopup";
import { AxiosError } from 'axios';


const CategoryPage = ({ restaurantId }: { restaurantId: string }) => {
  const [restaurantCategories, setRestaurantCategories] = useState<Category[]>([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [isConfirmationOpen, setConfirmationOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
  const [categoryToDelete, setCategoryToDelete] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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

  const openConfirmationPopup = (categoryId: string) => {
    setCategoryToDelete(categoryId);
    setErrorMessage(null); // Limpa a mensagem de erro
    setConfirmationOpen(true);
  };

  const closeConfirmationPopup = () => {
    setConfirmationOpen(false);
    setCategoryToDelete(null);
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

  const handleConfirmDelete = async () => {
    if (categoryToDelete) {
      try {
        await deleteCategory(categoryToDelete);
        fetchCategories();
        closeConfirmationPopup();
      } catch (error) {
        if (error instanceof AxiosError) {
          // Verifica se a resposta e a mensagem de erro existem
          if (error.response && error.response.data && error.response.data.error) {
            setErrorMessage(error.response.data.error);
          } else {
            console.error("Erro ao deletar categoria:", error.message);
          }
        } else {
          console.error("Erro ao deletar categoria:", error);
        }
      }
    }
  };

  return (
    <section id="exibidorDeCategorias" className={styles.section}>
      {restaurantCategories.map((category) => (
        <CategoryEditContainer 
          key={category.id} 
          onEditClick={() => openEditPopup(category)} 
          onDeleteClick={() => openConfirmationPopup(category.id)} // Alterado para abrir o popup de confirmação
        >
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
      <ConfirmationPopup
        isOpen={isConfirmationOpen}
        onClose={closeConfirmationPopup}
        onConfirm={handleConfirmDelete}
        errorMessage={errorMessage} // Passa a mensagem de erro para o popup de confirmação
      />
    </section>
  );
};

export default CategoryPage;
