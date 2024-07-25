import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { localContextEnd, localContextGetInfo } from '../../context/LocalContext';

interface Restaurant {
  id: string;
  email: string;
  password: string;
  owner_name: string;
  owner_cpf: string;
  owner_address: string;
  owner_telephone: string;
  restaurant_name: string;
  restaurant_cnpj: string;
  restaurant_address: string;
  restaurant_telephone: string;
}

const HomeRestaurantePage: React.FC = () => {
  const [user, setUser] = useState<Restaurant | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const id = localContextGetInfo("user", "id");
        if (id) {
          const response = await axios.get(`http://localhost:5001/restaurant/${id}`);
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
    const id = localContextGetInfo("user", "id");
    if (id) {
      navigate(`/${id}/menu-editor`);
    } else {
      setError('Nenhum usuário logado encontrado');
    }
  };

  return (
    <div>
      <h2>Home Restaurante</h2>
      {error ? (
        <p>{error}</p>
      ) : user ? (
        <div>
          <h3>Dados do Restaurante</h3>
          <p>Nome: {user.owner_name}</p>
          <p>Email: {user.email}</p>
          <p>Telefone: {user.restaurant_telephone}</p>
          <p>Endereço: {user.restaurant_address}</p>
          <button type="button" onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <p>Carregando dados do usuário...</p>
      )}
      <button data-cy="EnterMenuEditor" onClick={handleNavigateToMenuEditor}>Ir para Menu Editor</button>
    </div>
  );
};

export default HomeRestaurantePage;
