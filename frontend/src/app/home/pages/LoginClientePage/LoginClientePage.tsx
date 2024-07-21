import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import * as z from 'zod';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/MainContext';
import Popup from '../../../../shared/components/Popup';

const schema = z.object({
  email: z.string().email({ message: "E-mail inválido" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters long" })
});

type LoginFormInputs = z.infer<typeof schema>;

const LoginClientPage: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>({
    resolver: zodResolver(schema)
  });

  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const { dispatch } = useAuth();

  const handleLogin = async (data: LoginFormInputs) => {
    try {
      const response = await axios.post('http://localhost:5001/login-client', data);
      setMessage(response.data.message);
      console.log('User ID:', response.data.id); // Verificar o ID do usuário no console
      localStorage.setItem('user', JSON.stringify({ id: response.data.id }));
      dispatch({ type: 'LOGIN', payload: response.data.id });
      navigate('/home-client'); // Redireciona para a página Home Cliente
    } catch (error: any) {
      setMessage(error.response.data.message);
    }
  };  

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit(handleLogin)}>
        <div>
          <label>Email:</label>
          <input type="email" {...register('email')} />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div>
          <label>Senha:</label>
          <input type="password" {...register('password')} />
          {errors.password && <p>{errors.password.message}</p>}
        </div>
        <div>
        <Link to="/forgot-password">Esqueci minha Senha</Link>
        </div>
        <button type="submit">Entrar</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default LoginClientPage;