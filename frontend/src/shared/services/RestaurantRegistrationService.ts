import axios from 'axios';

interface SanityTestResponse {
    message: string;
}

const API_URL = 'http://localhost:5001/restaurant';

export const sanityTest = async (): Promise<SanityTestResponse> => {
  try {
    const response = await axios.get<SanityTestResponse>(`${API_URL}/test`);
    return response.data;
  } catch (error) {
    console.error('Error during sanity test:', error);
    throw error;
  }
};

export const registerRestaurant = async (restaurant: any): Promise<any> => {
  try {
    const response = await axios.post(`${API_URL}/register`, restaurant);
    return response.data;
  } catch (error) {
    console.error('Error during restaurant registration:', error);
    throw error;
  }
}
