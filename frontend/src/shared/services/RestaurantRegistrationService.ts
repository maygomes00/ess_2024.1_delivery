import axios from 'axios';
import { Restaurant } from "../../shared/types/Restaurant";

interface SanityTestResponse {
    message: string;
}

const API_URL = 'http://localhost:5001/restaurant';

export const sanityTest = async (): Promise<SanityTestResponse> => {
  try {
    const response = await axios.get<SanityTestResponse>(`${API_URL}/test`);
        console.log('PASSED')
    return response.data;
  } catch (error) {
    console.error('Error during sanity test:', error);
    throw error;
  }
};

export const registerRestaurant = async (rtosubmit: Restaurant): Promise<Restaurant> => {
  try {
    const response = await axios.post(`${API_URL}/`, rtosubmit);
    return response.data;
  } catch (error) {
    console.error('Error during restaurant registration:', error);
    throw error;
  }
}
