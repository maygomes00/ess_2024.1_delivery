import styles from './index.module.css';


const ConfirmationPopup = ({ isOpen, onClose, onConfirm, errorMessage }) => {
    if (!isOpen) return null;
  
    return (
      <div className={styles.overlay}>
        <div className={styles.modal}>
          <h2>Confirmação</h2>
          <p>Você tem certeza de que deseja deletar esta categoria?</p>
          {errorMessage && <p className={styles.error}>{errorMessage}</p>}
          <div className={styles.buttonContainer}>
            <button className={styles.confirmButton} onClick={onConfirm}>Confirmar</button>
            <button className={styles.cancelButton} onClick={onClose}>Cancelar</button>
          </div>
        </div>
      </div>
    );
  };
  

export default ConfirmationPopup;
