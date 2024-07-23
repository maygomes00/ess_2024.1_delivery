import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './EsqueciCliente.module.css';

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
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
            <label htmlFor="email">Email:</label>
            <div>
              <input 
                type="email" 
                id="email"
                data-cy="email" // Atributo data-cy para o campo de email
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
              />
            </div>
          </div>
          <button 
            type="submit" 
            data-cy="submit-button" // Atributo data-cy para o botão de envio
            className={styles.button}
          >
            Enviar Link
          </button>
        </form>
        {isModalOpen && (
          <Modal 
            message={message} 
            isSuccess={isSuccess} 
            onClose={handleCloseModal} 
          />
        )}
      </div>
    </div>
  );
};

const Modal: React.FC<{ message: string; isSuccess: boolean; onClose: () => void }> = ({ message, isSuccess, onClose }) => {
  return (
    <div className={styles.modal} data-cy="modal"> {/* Atributo data-cy para o modal */}
      <div className={styles['modal-content']} data-cy="modal-content"> {/* Atributo data-cy para o conteúdo do modal */}
        <p>{message}</p>
        <button 
          onClick={onClose} 
          data-cy={isSuccess ? 'go-to-login-button' : 'close-button'} // Atributo data-cy para o botão de ação do modal
        >
          {isSuccess ? 'Ir para Login' : 'Fechar'}
        </button>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
