import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
        </div>
      ) : (
        <p>Carregando dados do usuário...</p>
      )}
    </div>
  );
};

export default HomeClientePage;
