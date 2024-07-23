import { Restaurant } from './login_common_interfaces';
import fs from 'fs';

const gi_restaurants_path = './src/data/restaurants/restaurants.json';

export const getRestaurantNameById = (id: string): string | null => {
  try {
    const data = fs.readFileSync(gi_restaurants_path, 'utf8');
    const restaurants: Restaurant[] = JSON.parse(data);
    const restaurant = restaurants.find((r) => r.id === id);

    return restaurant ? restaurant.restaurant_name : null;
  } catch (error) {
    console.error('Error reading or parsing restaurants database:', error);
    return null;
  }
};
