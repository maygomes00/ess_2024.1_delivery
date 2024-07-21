import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface User {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  endereco: string;
}

const HomeClientePage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate(); // Certifique-se de que useNavigate seja importado

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Recuperar o ID do usuário do localStorage
        const userToken = localStorage.getItem('user');
        if (userToken) {
          const user = JSON.parse(userToken);
          console.log('User token:', userToken);
          console.log('Fetching data for user ID:', user.id);

          // Fazer a requisição para buscar os dados do usuário pelo ID
          const response = await axios.get(`http://localhost:5001/users/${user.id}`);
          console.log('User data fetched:', response.data);
          setUser(response.data);
        } else {
          setError('Nenhum usuário logado encontrado');
        }
      } catch (e) {
        setError('Falha ao carregar os dados do usuário');
        console.error('Erro ao buscar os dados do usuário:', e);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:5001/login-client/logout-client');
      localStorage.removeItem('user');
      setUser(null);
      navigate('/login-client'); // Use navigate aqui
    } catch (e) {
      console.error('Erro ao fazer logout:', e);
      setError('Falha ao fazer logout');
    }
  };

  return (
    <div>
      <h2>Home Cliente</h2>
      {error ? (
        <p>{error}</p>
      ) : user ? (
        <div>
          <h3>Dados do Usuário</h3>
          <p>Nome: {user.nome}</p>
          <p>Email: {user.email}</p>
          <p>Telefone: {user.telefone}</p>
          <p>Endereço: {user.endereco}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <p>Carregando dados do usuário...</p>
      )}
    </div>
  );
};

export default HomeClientePage;