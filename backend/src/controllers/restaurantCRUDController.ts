import { Request, Response } from 'express';
import { Restaurant } from './login_common_interfaces';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import path from 'path';

const restaurantsFilePath = './src/data/restaurants/restaurants.json';

const getRestaurants = (req: Request, res: Response): void => {
  const restaurants = JSON.parse(fs.readFileSync(restaurantsFilePath, 'utf8'));
  res.json(restaurants);
};

const getRestaurantById = (req: Request, res: Response): void => {
  const { id } = req.params;
  const restaurants = JSON.parse(fs.readFileSync(restaurantsFilePath, 'utf8'));
  const restaurant = restaurants.find((r: Restaurant) => r.id === id);
  if (restaurant) {
    res.json(restaurant);
  } else {
    res.status(404).send('Restaurant not found');
  }
};

const createRestaurant = (req: Request, res: Response): void => {
  const newRestaurant: Restaurant = { ...req.body, id: uuidv4() };
  const restaurants = JSON.parse(fs.readFileSync(restaurantsFilePath, 'utf8'));
  restaurants.push(newRestaurant);
  fs.writeFileSync(restaurantsFilePath, JSON.stringify(restaurants, null, 2));
  res.status(201).json(newRestaurant);
};

const updateRestaurant = (req: Request, res: Response): void => {
  const { id } = req.params;
  const restaurants = JSON.parse(fs.readFileSync(restaurantsFilePath, 'utf8'));
  const restaurantIndex = restaurants.findIndex((r: Restaurant) => r.id === id);
  if (restaurantIndex !== -1) {
    restaurants[restaurantIndex] = { ...restaurants[restaurantIndex], ...req.body };
    fs.writeFileSync(restaurantsFilePath, JSON.stringify(restaurants, null, 2));
    res.json(restaurants[restaurantIndex]);
  } else {
    res.status(404).send('Restaurant not found');
  }
};

const deleteRestaurant = (req: Request, res: Response): void => {
  const { id } = req.params;
  const restaurants = JSON.parse(fs.readFileSync(restaurantsFilePath, 'utf8'));
  const updatedRestaurants = restaurants.filter((r: Restaurant) => r.id !== id);
  fs.writeFileSync(restaurantsFilePath, JSON.stringify(updatedRestaurants, null, 2));
  res.status(204).send();
};

export { getRestaurants, getRestaurantById, createRestaurant, updateRestaurant, deleteRestaurant };
