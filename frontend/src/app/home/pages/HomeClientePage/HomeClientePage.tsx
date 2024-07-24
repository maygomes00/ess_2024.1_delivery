import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { localContextEnd, localContextGetInfo } from '../../context/LocalContext';

interface User {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  endereco: string;
  senha: string;
}

const HomeClientePage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = localContextGetInfo("user", "id");
        if (userId !== "") {
          const response = await axios.get(`http://localhost:5001/users/${userId}`);
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
      localContextEnd();
      setUser(null);
      navigate('/login-client');
    } catch (e) {
      console.error('Erro ao fazer logout:', e);
      setError('Falha ao fazer logout');
    }
  };

  const handleEdit = () => {
    if (user) {
      navigate(`/users/config/edit/${user.id}`);
    }
  };

  const handleManageUsers = () => {
    navigate('/users/config');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', backgroundColor: '#f0f2f5', minHeight: '100vh' }}>
      <h2 style={{ color: '#333', marginBottom: '20px' }}>Home Cliente {localStorage.getItem("start")}</h2>
      {error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : user ? (
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', width: '100%', maxWidth: '400px', marginBottom: '20px' }}>
          <h3 style={{ color: '#333', marginBottom: '10px' }}>Dados do Usuário</h3>
          <p style={{ color: '#555', margin: '5px 0' }}>Nome: {user.nome}</p>
          <p style={{ color: '#555', margin: '5px 0' }}>Email: {user.email}</p>
          <p style={{ color: '#555', margin: '5px 0' }}>Telefone: {user.telefone}</p>
          <p style={{ color: '#555', margin: '5px 0' }}>Endereço: {user.endereco}</p>
          <p style={{ color: '#555', margin: '5px 0' }}>Senha: {user.senha}</p>
          <button
            style={{ backgroundColor: '#9f2234', color: 'white', border: 'none', padding: '10px 20px', margin: '10px', borderRadius: '5px', cursor: 'pointer', transition: 'background-color 0.3s ease' }}
            onClick={handleLogout}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#6e0001')}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#9f2234')}
          >
            Logout
          </button>
          <button
            style={{ backgroundColor: '#9f2234', color: 'white', border: 'none', padding: '10px 20px', margin: '10px', borderRadius: '5px', cursor: 'pointer', transition: 'background-color 0.3s ease' }}
            onClick={handleEdit}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#6e0001')}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#9f2234')}
          >
            Editar Dados
          </button>
        </div>
      ) : (
        <p>Carregando dados do usuário...</p>
      )}
      <button
        style={{ backgroundColor: '#0066cc', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', transition: 'background-color 0.3s ease' }}
        onClick={handleManageUsers}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#005bb5')}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#0066cc')}
      >
        Gerenciar Usuários
      </button>
    </div>
  );
};

export default HomeClientePage;
