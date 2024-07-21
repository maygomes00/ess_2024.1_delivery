import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './EsqueciCliente.module.css'; // Importe o CSS Module

const ResetPasswordPage: React.FC = () => {
  const { token } = useParams<{ token: string }>();
  const [newPassword, setNewPassword] = useState<string>(''); // Tipagem explícita para string
  const [message, setMessage] = useState<string>(''); // Tipagem explícita para string
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // Tipagem explícita para boolean
  const [isSuccess, setIsSuccess] = useState<boolean>(false); // Tipagem explícita para boolean
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.post(`http://localhost:5001/forgot-password/reset/${token}`, { newPassword });
      setMessage(response.data.msg);
      setIsSuccess(true);
    } catch (error: any) {
      setMessage(error.response.data.msg);
      setIsSuccess(false);
    } finally {
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    if (isSuccess) {
      navigate('/login-client');
    }
  };

  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <h2>Redefinir Senha</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Nova Senha:</label>
            <input 
              type="password" 
              value={newPassword} 
              onChange={(e) => setNewPassword(e.target.value)} 
              required 
            />
          </div>
          <button type="submit" className={styles.button}>Redefinir Senha</button>
        </form>
        {isModalOpen && (
          <Modal message={message} isSuccess={isSuccess} onClose={handleCloseModal} />
        )}
      </div>
    </div>
  );
};

const Modal: React.FC<{ message: string; isSuccess: boolean; onClose: () => void }> = ({ message, isSuccess, onClose }) => {
  return (
    <div className={styles.modal}>
      <div className={styles['modal-content']}>
        <p>{message}</p>
        <button onClick={onClose} className={styles.button}>
          {isSuccess ? 'Ir para Login' : 'Fechar'}
        </button>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
