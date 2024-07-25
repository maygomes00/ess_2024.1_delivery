import { Restaurant } from './login_common_interfaces';
import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

const gi_restaurants_path = path.resolve(
  './src/data/restaurants/restaurants.json'
); // Defina o caminho correto para o arquivo JSON

export const getRestaurantNameById = (req: Request, res: Response): void => {
  const id = req.params.id;
  try {
    const data = fs.readFileSync(gi_restaurants_path, 'utf8');
    const restaurants: Restaurant[] = JSON.parse(data);
    const restaurant = restaurants.find((r) => r.id === id);

    if (restaurant) {
      // res.status(200).json({ restaurant_name: restaurant.restaurant_name });
      res.status(200).json(restaurant);
    } else {
      res.status(404).json({ error: 'Restaurante não encontrado!' });
    }
  } catch (error) {
    console.error('Error reading or parsing restaurants database:', error);
    res.status(500).json({
      error: 'Erro interno do servidor',
    });
  }
};

export const getAllRestaurants = (req: Request, res: Response): void => {
  try {
    const data = fs.readFileSync(gi_restaurants_path, 'utf8');
    const restaurants: Restaurant[] = JSON.parse(data);
    res.status(200).json(restaurants);
  } catch (error) {
    console.error('Error reading or parsing restaurants database:', error);
    res.status(500).json({
      error: 'Erro interno do servidor',
    });
  }
};
