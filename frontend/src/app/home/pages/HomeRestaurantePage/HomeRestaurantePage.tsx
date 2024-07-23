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
}

const HomeRestaurantePage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const restauranteId = localContextGetInfo("user", "id");
        if (restauranteId != "") {
          const response = await axios.get(`http://localhost:5001/restaurant/${restauranteId}`);
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
      await axios.post('http://localhost:5001/login-restaurant/logout-restaurant');
      localContextEnd();
      setUser(null);
      navigate('/login-restaurant');
    } catch (e) {
      console.error('Erro ao fazer logout:', e);
      setError('Falha ao fazer logout');
    }
  };

  const handleNavigateToMenuEditor = () => {
    navigate('/f257adef-dda8-46c7-bbfd-4275a90d837e/menu-editor/categorias');
  };

  return (
    <div>
      <h2>Home Restaurante {localStorage.getItem("start")}</h2>
      {error ? (
        <p>{error}</p>
      ) : user ? (
        <div>
          <h3>Dados do Restaurante</h3>
          <p>Nome: {user.nome}</p>
          <p>Email: {user.email}</p>
          <p>Telefone: {user.telefone}</p>
          <p>Endereço: {user.endereco}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <p>Carregando dados do usuário...</p>
      )}
      <button onClick={handleNavigateToMenuEditor}>Ir para Menu Editor</button>
    </div>
  );
};

export default HomeRestaurantePage;
