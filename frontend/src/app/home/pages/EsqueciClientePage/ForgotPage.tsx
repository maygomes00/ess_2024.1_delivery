import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
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
    <div>
      <h2>Esqueci minha Senha</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <div>
            Insira seu e-mail de cadastro para que a gente te envie 
            um link de acesso para recuperação da sua senha.
          </div>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        <button type="submit">Enviar Link</button>
      </form>
      {isModalOpen && (
        <Modal message={message} isSuccess={isSuccess} onClose={handleCloseModal} />
      )}
    </div>
  );
};

const Modal: React.FC<{ message: string; isSuccess: boolean; onClose: () => void }> = ({ message, isSuccess, onClose }) => {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)'
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        textAlign: 'center'
      }}>
        <p>{message}</p>
        <button onClick={onClose}>
          {isSuccess ? 'Ir para Login' : 'Fechar'}
        </button>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
