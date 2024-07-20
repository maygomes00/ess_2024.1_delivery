import React from 'react';
import { useAuth } from '../../context/MainContext';

const HomePage: React.FC = () => {
  const { state } = useAuth();

  if (!state.user) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Welcome, {state.user.nome}</h2>
      <p>Email: {state.user.email}</p>
      <p>Telefone: {state.user.telefone}</p>
      <p>Endereço: {state.user.endereco}</p>
    </div>
  );
};

export default HomePage;
