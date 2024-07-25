import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import * as z from 'zod';
import { useNavigate, Link } from 'react-router-dom';
import { localContextStart, localContextUpdateInfo } from '../../context/LocalContext';
import styles from './LoginClientPage.module.css'; 

const schema = z.object({
  email: z.string().email({ message: "E-mail inválido" }),
  password: z.string().min(1, { message: "A senha deve ser informada" }),
});

type LoginFormInputs = z.infer<typeof schema>;

const LoginClientPage: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>({
    resolver: zodResolver(schema)
  });

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (data: LoginFormInputs) => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5001/login-client', data);
      setMessage(response.data.message);
      console.log('User ID:', response.data.id); // Verificar o ID do usuário no console
      localContextStart();
      localContextUpdateInfo("user", "id", response.data.id);
      navigate('/home-client'); // Redireciona para a página Home Cliente
    } catch (error: any) {
      setMessage(error.response?.data?.message || 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = () => {
    navigate('/users'); // Redireciona para a página de cadastro
  };

  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <h2>Login</h2>
        <form onSubmit={handleSubmit(handleLogin)} className={styles.form}>
          <div>
            <label>Email:</label>
            <input type="email" {...register('email')} data-cy="email" />
            {errors.email && <p className={styles.error}>{errors.email.message}</p>}
          </div>
          <div>
            <label>Senha:</label>
            <input type="password" {...register('password')} data-cy="password" />
            {errors.password && <p className={styles.error}>{errors.password.message}</p>}
          </div>
          <div>
            <Link to="/forgot-password" data-cy="forgot-password-link">Esqueci minha Senha</Link>
          </div>
          <div className={styles.buttonContainer}>
            <button type="submit" className={loading ? styles.loadingButton : styles.button} disabled={loading} data-cy="Entrar">
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
            <button type="button" onClick={handleSignUp} className={`${styles.button} ${styles.signupButton}`} data-cy="Cadastre-se">
              Cadastre-se
            </button>
          </div>
        </form>
        {message && <p className={styles.message}>{message}</p>}
      </div>
    </div>
  );
};

export default LoginClientPage;
