import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { Request, Response } from "express";;

const restaurants_json_path = './src/data/restaurants/restaurants.json';

export const restaurantsSanityTest = (req: Request, res: Response): void => {
  res.status(200).send("Restaurants route works!");
}

const measurePasswordStrength = (password: string): string => {
  let strengthScore = 0;

  // Criteria for password strength
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /[0-9]/.test(password);
  const hasSpecialChars = /[^A-Za-z0-9]/.test(password);
  const isLongEnough = password.length >= 8;

  // Increment strengthScore based on criteria met
  if (hasUpperCase) strengthScore++;
  if (hasLowerCase) strengthScore++;
  if (hasNumbers) strengthScore++;
  if (hasSpecialChars) strengthScore++;
  if (isLongEnough) strengthScore++;

  // Determine password strength based on score
  switch (strengthScore) {
    case 0:
    case 1:
    case 2:
      return "Weak";
    case 3:
    case 4:
      return "Moderate";
    case 5:
      return "Strong";
    default:
      return "Unknown";
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

  const { email, password, owner_name, owner_cpf, owner_address, owner_telephone, restaurant_name, restaurant_cnpj, restaurant_address, restaurant_telephone } = req.body;

  if (!email || !password || !owner_name || !owner_cpf || !owner_address || !owner_telephone || !restaurant_name || !restaurant_cnpj || !restaurant_address || !restaurant_telephone) {
    res.status(400).send("Missing required information");
    return;
  }

  const passwordStrength = measurePasswordStrength(password);

  if (passwordStrength === "Weak") {
    res.status(400).send("Password is too weak");
    return;
  }

  const restaurant_db = JSON.parse(fs.readFileSync(path.resolve(restaurants_json_path), 'utf-8'))

  const cnpj_match = restaurant_db.find((restaurant: Restaurant) => restaurant.restaurant_cnpj === restaurant_cnpj);
  const email_match = restaurant_db.find((restaurant: Restaurant) => restaurant.email === email);

  if (cnpj_match) {
    res.status(409).send("Restaurant already registered");
    return;
  }

  if (email_match) {
    res.status(409).send("Email already registered");
    return;
  }

  const id_restaurant = uuidv4();

  const new_restaurant: Restaurant = {
    id: id_restaurant,
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
    items: []
  };

  restaurant_db.push(new_restaurant);
}

export const getRestaurant = (req: Request, res: Response): void => {
  const { id } = req.params;

  const restaurant_db = JSON.parse(fs.readFileSync(path.resolve(restaurants_json_path), 'utf-8'))

  const restaurant = restaurant_db.find((restaurant: Restaurant) => restaurant.id === id);

  if (!restaurant) {
    res.status(404).send("Restaurant not found");
    return;
  }

  res.status(200).send(restaurant);
}

export const deleteRestaurant = (req: Request, res: Response): void => {
  const { id } = req.params;

  const restaurant_db = JSON.parse(fs.readFileSync(path.resolve(restaurants_json_path), 'utf-8'))

  const restaurantIndex = restaurant_db.findIndex((restaurant: Restaurant) => restaurant.id === id);

  if (restaurantIndex === -1) {
    res.status(404).send("Restaurant not found");
    return;
  }

  restaurant_db.splice(restaurantIndex, 1);

  fs.writeFileSync(path.resolve(restaurants_json_path), JSON.stringify(restaurant_db, null, 2));

  res.status(200).send("Restaurant deleted");
}

