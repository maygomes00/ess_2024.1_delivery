import React, { useState } from 'react';
import RestaurantForm from '../../../home/forms/RestaurantCRUDForm';
import RestaurantList from '../../components/RestaurantList';
import { Restaurant } from "../../../../shared/types/Restaurant";

const RestaurantCRUD: React.FC = () => {
  const [editingRestaurant, setEditingRestaurant] = useState<Restaurant | null>(null);

  const handleSave = () => {
    setEditingRestaurant(null);
  };

  return (
    <div>
      {editingRestaurant ? (
        <RestaurantForm restaurant={editingRestaurant} onSave={handleSave} />
      ) : (
        <RestaurantList onEdit={setEditingRestaurant} />
      )}
    </div>
  );
};

export default RestaurantCRUD;
