import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import * as z from 'zod';
import { useNavigate } from 'react-router-dom';
import { localContextStart, localContextUpdateInfo } from '../../context/LocalContext';
import styles from './LoginRestaurantePage.module.css'; // Importe o CSS Module

const schema = z.object({
  email: z.string().email({ message: "E-mail inválido" }),
  password: z.string().min(1, { message: "A senha deve ser informada" }),
});

type LoginFormInputs = z.infer<typeof schema>;

const LoginRestaurantPage: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>({
    resolver: zodResolver(schema)
  });

  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (data: LoginFormInputs) => {
    try {
      const response = await axios.post('http://localhost:5001/login-restaurant', data);
      setMessage(response.data.message);
      console.log('User ID:', response.data.id); // Verificar o ID do usuário no console
      localContextStart()
      localContextUpdateInfo("user", "id", response.data.id)
      navigate('/home-restaurant'); // Redireciona para a página Home do Restaurante
    } catch (error: any) {
      setMessage(error.response.data.message);
    }
  };  

  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <h2>Login</h2>
        <form onSubmit={handleSubmit(handleLogin)} className={styles.form}>
          <div>
            <label>Email:</label>
            <input type="email" {...register('email')} data-cy="email-input" />
            {errors.email && <p className={styles.error} data-cy="email-error">{errors.email.message}</p>}
          </div>
          <div>
            <label>Senha:</label>
            <input type="password" {...register('password')} data-cy="password-input" />
            {errors.password && <p className={styles.error} data-cy="password-error">{errors.password.message}</p>}
          </div>
          <button type="submit" className={styles.button} data-cy="submit-button">Entrar</button>
        </form>
        {message && <p data-cy="message">{message}</p>}
      </div>
    </div>
  );
};

export default LoginRestaurantPage;
