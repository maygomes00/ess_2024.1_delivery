import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ResetPasswordPage: React.FC = () => {
  const { token } = useParams<{ token: string }>();
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.post(`http://localhost:5001/forgot-password/reset/${token}`, { newPassword });
      setMessage(response.data.msg);
      navigate('/login-client');
    } catch (error: any) {
      setMessage(error.response.data.msg);
    }
  };

  return (
    <div>
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
        <button type="submit">Redefinir Senha</button>
        {/* //Depois tem que colocar redirect para Login */}
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ResetPasswordPage;
