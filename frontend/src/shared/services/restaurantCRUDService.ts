import axios from 'axios';
import { Restaurant } from '../types/Restaurant';

const API_URL = 'http://localhost:5001/restaurantsCRUD';

export const getRestaurants = async (): Promise<Restaurant[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createRestaurant = async (restaurant: Restaurant): Promise<Restaurant> => {
  const response = await axios.post(API_URL, restaurant);
  return response.data;
};

export const updateRestaurant = async (id: string, restaurant: Partial<Restaurant>): Promise<Restaurant> => {
  const response = await axios.put(`${API_URL}/${id}`, restaurant);
  return response.data;
};

export const deleteRestaurant = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
