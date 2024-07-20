// AddCategoryPopup.jsx

import { useState } from "react";
import Modal from "react-modal";
import styles from "./index.module.css";
import { addCategory } from "../../../shared/services/CategoriesService";

const AddCategoryPopup = ({ isOpen, onClose, onAddCategory, restaurantId }) => {
  const [categoryName, setCategoryName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleAddCategory = async () => {
    if (!categoryName.trim()) {
      setErrorMessage("É obrigatório um nome para a categoria!");
      return;
    }

    try {
      if (!restaurantId) {
        console.error("ID do restaurante não encontrado.");
        return;
      }

      const newCategory = await addCategory(categoryName, restaurantId);
      onAddCategory(newCategory);
      setCategoryName("");
      setErrorMessage(""); // Limpa a mensagem de erro após adicionar a categoria com sucesso
      onClose();
    } catch (error) {
      console.error("Erro ao adicionar categoria:", error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={styles.modal}
      overlayClassName={styles.overlay}
    >
      <h2>Adicionar Categoria</h2>
      <input
        type="text"
        placeholder="Nome da Categoria"
        value={categoryName}
        onChange={(e) => setCategoryName(e.target.value)}
      />
      {errorMessage && <p className={styles.error}>{errorMessage}</p>}
      <div className={styles.buttonContainer}>
        <button className={styles.acceptButton} onClick={handleAddCategory}>Adicionar</button>
        <button className={styles.cancelButton} onClick={onClose}>Cancelar</button>
      </div>
    </Modal>
  );
};

export default AddCategoryPopup;
