import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import styles from "./NoOrdersModal.module.css";

interface NoOrdersModalProps {
  show: boolean;
  handleClose: () => void;
}

const NoOrdersModal: React.FC<NoOrdersModalProps> = ({ show, handleClose }) => {
  const navigate = useNavigate();

  const redirectToHome = () => {
    navigate("/");
  };

  return (
    <Modal
      show={show}
      onHide={redirectToHome}
      dialogClassName={styles.modalOverlay}
    >
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h5 className={styles.modalTitle}>Aviso</h5>
          <Button variant="close" onClick={redirectToHome} />
        </div>
        <div className={styles.modalBody}>
          Não há detalhes de pedidos para o seu perfil
        </div>
        <div className={styles.modalFooter}>
          <Button
            variant="primary"
            onClick={redirectToHome}
            className={styles.modalButton}
          >
            Confirmar
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default NoOrdersModal;
