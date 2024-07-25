import React, { useState } from 'react';
import RestaurantForm from '../../../home/forms/RestaurantCRUDForm';
import RestaurantList from '../../components/RestaurantList';
import { Restaurant } from "../../../../shared/types/Restaurant";
import { useNavigate, Link } from 'react-router-dom';

const RestaurantCRUD: React.FC = () => {
  const [editingRestaurant, setEditingRestaurant] = useState<Restaurant | null>(null);
  const [creatingRestaurant, setCreatingRestaurant] = useState<Restaurant | null>(null);
  const navigate = useNavigate();

  const handleSave = () => {
    setEditingRestaurant(null);
  };

  const handleCreate = () => {
    navigate('/register-restaurant');
  };

  return (
    <div>
      {editingRestaurant ? (
        <RestaurantForm restaurant={editingRestaurant} onSave={handleSave} />
      ) : (
        <RestaurantList onEdit={setEditingRestaurant} onCreate={handleCreate}/>
      )}
    </div>
  );
};

export default RestaurantCRUD;
