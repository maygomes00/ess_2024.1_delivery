import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import e, { Request, Response } from 'express';
import { User, Restaurant } from './login_common_interfaces';

const restaurants_json_path = './src/data/restaurants/restaurants.json';
const userHandlingPath = './src/data/users/r_user_handling.json';

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
  fs.readFile(path.resolve(userHandlingPath), 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Server error' });
    }

    const current_user_db: User[] = JSON.parse(data);
    if (current_user_db.length === 0) {
      return res.status(401).json({ message: 'No user logged in' });
    }

    fs.readFile(path.resolve(restaurants_json_path), 'utf8', (err, data) => {
      if (err) {
        return res.status(500).json({ message: 'Server error' });
      }

      const registered_restaurants: Restaurant[] = JSON.parse(data);
      const logged_restaurant = registered_restaurants.find(
        (restaurant) => restaurant.email === current_user_db[0].email
      );

      if (logged_restaurant) {
        return res.status(200).json(logged_restaurant);
      } else {
        return res.status(404).json({ message: 'Restaurant not found' });
      }
    });
  });
};

export const deleteRestaurant = (req: Request, res: Response): void => {
  fs.readFile(path.resolve(userHandlingPath), 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Server error' });
    }

    const current_user_db: User[] = JSON.parse(data);
    if (current_user_db.length === 0) {
      return res.status(401).json({ message: 'No user logged in' });
    }

    fs.readFile(path.resolve(restaurants_json_path), 'utf8', (err, data) => {
      if (err) {
        return res.status(500).json({ message: 'Server error' });
      }

      const registered_restaurants: Restaurant[] = JSON.parse(data);
      const logged_restaurant = registered_restaurants.find(
        (restaurant) => restaurant.email === current_user_db[0].email
      );

      if (logged_restaurant) {
        const new_restaurants = registered_restaurants.filter(
          (restaurant) => restaurant.email !== current_user_db[0].email
        );
        fs.writeFileSync(
          path.resolve(restaurants_json_path),
          JSON.stringify(new_restaurants)
        );
        fs.writeFileSync(path.resolve(userHandlingPath), JSON.stringify([]));
        return res.status(200).json({ message: 'Restaurant deleted' });
      } else {
        return res.status(404).json({ message: 'Restaurant not found' });
      }
    });
  });
};
