import React, { useState } from 'react';
import axios from 'axios';

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5001/forgot-password', { email });
      setMessage(response.data.msg);
    } catch (error: any) {
      setMessage(error.response.data.msg);
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
      {message && <p>{message}</p>}
    </div>
  );
};

export default ForgotPasswordPage;
