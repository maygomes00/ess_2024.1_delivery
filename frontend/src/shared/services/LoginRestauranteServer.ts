import axios from 'axios';
import { Restaurant } from '../types/login-restaurant';

export const loginUser = async (email: string, password: string): Promise<Restaurant> => {
  const response = await axios.post('http://localhost:5001/login-restaurant', { email, password });
  return response.data.user;
};

export const logoutUser = async (): Promise<void> => {
  await axios.post('http://localhost:5001/login-restaurant/logout-restaurant');
};




