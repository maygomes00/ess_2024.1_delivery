import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import e, { Request, Response } from 'express';

const restaurants_json_path = './src/data/restaurants/restaurants.json';

export const restaurantsSanityTest = (req: Request, res: Response): void => {
  res.status(200).send('Restaurants route works!');
};

const measurePasswordStrength = (password: string): string => {
  let strengthScore = 0;

  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /[0-9]/.test(password);
  const hasSpecialChars = /[^A-Za-z0-9]/.test(password);
  const isLongEnough = password.length >= 8;

  if (hasUpperCase) strengthScore++;
  if (hasLowerCase) strengthScore++;
  if (hasNumbers) strengthScore++;
  if (hasSpecialChars) strengthScore++;
  if (isLongEnough) strengthScore++;

  switch (strengthScore) {
    case 0:
    case 1:
    case 2:
      return 'Weak';
    case 3:
    case 4:
      return 'Moderate';
    case 5:
      return 'Strong';
    default:
      return 'Unknown';
  }
};

interface Restaurant {
  id: string;
  email: string;
  password: string;
  owner_name: string;
  owner_cpf: string;
  owner_address: string;
  owner_telephone: string;
  restaurant_name: string;
  restaurant_cnpj: string;
  restaurant_address: string;
  restaurant_telephone: string;
  items: any[];
}

export const registerRestaurant = (req: Request, res: Response): void => {
  const {
    email,
    password,
    owner_name,
    owner_cpf,
    owner_address,
    owner_telephone,
    restaurant_name,
    restaurant_cnpj,
    restaurant_address,
    restaurant_telephone,
  } = req.body;

  if (
    !email ||
    !password ||
    !owner_name ||
    !owner_cpf ||
    !owner_address ||
    !owner_telephone ||
    !restaurant_name ||
    !restaurant_cnpj ||
    !restaurant_address ||
    !restaurant_telephone
  ) {
    res.status(400).send('Missing required information');
    return;
  }

  let restaurant_db: Restaurant[] = [];
  try {
    if (!fs.existsSync(path.resolve(restaurants_json_path))) {
      fs.writeFileSync(path.resolve(restaurants_json_path), JSON.stringify([]));
    } else {
      const fileContent = fs.readFileSync(
        path.resolve(restaurants_json_path),
        'utf-8'
      );
      restaurant_db = fileContent ? JSON.parse(fileContent) : [];
    }
  } catch (error) {
    console.error('Error handling the restaurant database file:', error);
    res.status(500).send('Internal server error');
    return;
  }

  const cnpj_match = restaurant_db.find(
    (restaurant: Restaurant) => restaurant.restaurant_cnpj === restaurant_cnpj
  );
  const email_match = restaurant_db.find(
    (restaurant: Restaurant) => restaurant.email === email
  );

  if (cnpj_match) {
    res.status(409).send('Empresa com mesmo CNPJ já cadastrada');
    return;
  }

  if (email_match) {
    res.status(409).send('Restaurante de mesmo email já cadastrado');
    return;
  }

  const newRestaurant: Restaurant = {
    id: uuidv4(),
    email,
    password,
    owner_name,
    owner_cpf,
    owner_address,
    owner_telephone,
    restaurant_name,
    restaurant_cnpj,
    restaurant_address,
    restaurant_telephone,
    items: [],
  };

  restaurant_db.push(newRestaurant);
  fs.writeFileSync(
    path.resolve(restaurants_json_path),
    JSON.stringify(restaurant_db)
  );

  res.status(200).send('Restaurante resgistrado com sucesso!');
  return;
};

export const getRestaurant = (req: Request, res: Response): void => {
  const { id } = req.params;

  const restaurant_db = JSON.parse(
    fs.readFileSync(path.resolve(restaurants_json_path), 'utf-8')
  );

  const restaurant = restaurant_db.find(
    (restaurant: Restaurant) => restaurant.id === id
  );

  if (!restaurant) {
    res.status(404).send('Restaurante não existe no sistema');
    return;
  }

  res.status(200).send(restaurant);
};

export const deleteRestaurant = (req: Request, res: Response): void => {
  const { id } = req.params;

  const restaurant_db = JSON.parse(
    fs.readFileSync(path.resolve(restaurants_json_path), 'utf-8')
  );

  const restaurantIndex = restaurant_db.findIndex(
    (restaurant: Restaurant) => restaurant.id === id
  );

  if (restaurantIndex === -1) {
    res.status(404).send('Restaurant not found');
    return;
  }

  restaurant_db.splice(restaurantIndex, 1);

  fs.writeFileSync(
    path.resolve(restaurants_json_path),
    JSON.stringify(restaurant_db, null, 2)
  );

  res.status(200).send('Conta de restaurante deletada.');
};
