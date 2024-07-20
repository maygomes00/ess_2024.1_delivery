// src/app/pages/LoginPage.tsx
// import React from 'react';
// import LoginForm from '../../../../shared/components/LoginClienteForm/LoginClienteForm';

// const LoginClientPage: React.FC = () => {
//   return (
//     <div>
//       <h1>Login</h1>
//       <LoginForm />
//     </div>
//   );
// };

// export default LoginClientPage;

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import * as z from 'zod';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/MainContext';

const schema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters long" })
});

type LoginFormInputs = z.infer<typeof schema>;

const LoginPage: React.FC = () => {
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
      localStorage.setItem('user', JSON.stringify(response.data.user));
      dispatch({ type: 'LOGIN', payload: response.data.user });
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
        <button type="submit">Entrar</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default LoginPage;
