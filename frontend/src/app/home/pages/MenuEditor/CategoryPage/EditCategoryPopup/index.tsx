import { useState } from "react";
import Modal from "react-modal";
import styles from "./index.module.css";
import { Category } from "../../../../../../shared/types/category";

type EditCategoryPopupProps = {
  isOpen: boolean;
  onClose: () => void;
  category: Category;
  onEditCategory: (categoryId: string, newName: string) => void;
  existingCategories: Category[];
};

const EditCategoryPopup = ({ isOpen, onClose, category, onEditCategory, existingCategories }: EditCategoryPopupProps) => {
  const [newCategoryName, setNewCategoryName] = useState(category.name);
  const [errorMessage, setErrorMessage] = useState("");

  const handleEditCategory = async () => {
    if (!newCategoryName.trim()) {
      setErrorMessage("É obrigatório um nome para a categoria!");
      return;
    }

    if (existingCategories.some(cat => cat.name.toLowerCase() === newCategoryName.toLowerCase() && cat.id !== category.id)) {
      setErrorMessage("Essa categoria já existe!");
      return;
    }

    try {
      await onEditCategory(category.id, newCategoryName);
      setErrorMessage(""); // Limpa a mensagem de erro após editar a categoria com sucesso
      onClose();
    } catch (error) {
      console.error("Erro ao editar categoria:", error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={styles.modal}
      overlayClassName={styles.overlay}
    >
      <h2>Editar Categoria</h2>
      <input
        type="text"
        placeholder="Nome da Categoria"
        value={newCategoryName}
        onChange={(e) => setNewCategoryName(e.target.value)}
      />
      {errorMessage && <p className={styles.error}>{errorMessage}</p>}
      <div className={styles.buttonContainer}>
        <button className={styles.acceptButton} onClick={handleEditCategory}>Salvar</button>
        <button className={styles.cancelButton} onClick={onClose}>Cancelar</button>
      </div>
    </Modal>
  );
};

export default EditCategoryPopup;