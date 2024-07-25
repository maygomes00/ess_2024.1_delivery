import React from "react";
import { Modal, Button } from "react-bootstrap";
import styles from "./index.module.css";

interface UnavailableModalProps {
  show: boolean;
  handleClose: () => void;
}

const UnavailableModal: React.FC<UnavailableModalProps> = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose} dialogClassName={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h5 className={styles.modalTitle}>Aviso</h5>
          <Button variant="close" onClick={handleClose} />
        </div>
        <div className={styles.modalBody}>"Esse item não está mais disponível"</div>
        <div className={styles.modalFooter}>
          <Button variant="primary" onClick={handleClose} className={styles.modalButton} data-cy="confirmar">
            Confirmar
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default UnavailableModal;
