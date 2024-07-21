import axios from 'axios';

export const requestPasswordReset = async (email: string) => {
  const response = await axios.post('http://localhost:5001/forgot-password', { email });
  return response.data;
};

export const resetPassword = async (token: string, newPassword: string) => {
  const response = await axios.post(`http://localhost:5001/forgot-password/reset/${token}`, { newPassword });
  return response.data;
};
