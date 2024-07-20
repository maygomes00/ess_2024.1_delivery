import axios from 'axios';
import { User } from '../types/login-cliente';

export const loginUser = async (email: string, password: string): Promise<User> => {
  const response = await axios.post('http://localhost:5001/login-client', { email, password });
  return response.data.user;
};




