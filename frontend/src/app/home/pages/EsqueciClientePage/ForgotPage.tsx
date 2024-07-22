import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './EsqueciCliente.module.css'; // Importe o CSS Module

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState<string>(''); // Tipagem explícita para string
  const [message, setMessage] = useState<string>(''); // Tipagem explícita para string
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // Tipagem explícita para boolean
  const [isSuccess, setIsSuccess] = useState<boolean>(false); // Tipagem explícita para boolean
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5001/forgot-password', { email });
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
        <h2>Esqueci minha Senha</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <div>
              Insira seu e-mail de cadastro para que a gente te envie 
              um link de acesso para recuperação da sua senha.
            </div>
            <label>Email:</label>
            <div>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
            </div>
          </div>
          <button type="submit" className={styles.button}>Enviar Link</button>
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

export default ForgotPasswordPage;
