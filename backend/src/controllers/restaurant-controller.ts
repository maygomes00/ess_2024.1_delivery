import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { Request, Response } from 'express';
import { Restaurant } from './login_common_interfaces';
import FuzzySearch from 'fuzzy-search';

let restaurants_path = './src/data/restaurants/restaurants.json';
export function setTesting(arewetesting: boolean): string {
  if (arewetesting) {
    return restaurants_path = './src/data/restaurants/restaurants_database.json';
  }
  return restaurants_path = './src/data/restaurants/restaurants.json';
}
export function eraseRestaurants() {
  fs.writeFileSync(path.resolve(restaurants_path), JSON.stringify([]));
}

export const restaurantsSanityTest = (req: Request, res: Response): void => {
  res.status(200).send('Rota funcional');
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
    res.status(400).send('Faltando informações obrigatórias');
    return;
  }

  let checkList: Restaurant[] = [];
  if (fs.existsSync(path.resolve(restaurants_path))) {
    const restaurantTextDatabase = fs.readFileSync(
      path.resolve(restaurants_path),
      'utf8'
    );
    if (restaurantTextDatabase) {
      checkList = JSON.parse(restaurantTextDatabase);
    }
  }

  const checkCNPJ = checkList.find(
    (restaurant: Restaurant) => restaurant.restaurant_cnpj === restaurant_cnpj
  );
  if (checkCNPJ) {
    res.status(409).send('Empresa com mesmo CNPJ já cadastrada');
    return;
  }
  const checkEmail = checkList.find(
    (restaurant: Restaurant) => restaurant.email === email
  );
  if (checkEmail) {
    res.status(409).send('Restaurante de mesmo email já cadastrado');
    return;
  }

  const passwordStrength = measurePasswordStrength(password);

  if (passwordStrength === 'Weak') {
    res.status(400).send('Senha fraca');
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

  checkList.push(newRestaurant);
  fs.writeFileSync(
    path.resolve(restaurants_path),
    JSON.stringify(checkList, null, 2),
    'utf8'
  );

  res.status(201).send('Restaurante cadastrado com sucesso!');
  return;
};

export const getRestaurant = (req: Request, res: Response): void => {
  const restaurantDatabase = path.resolve(restaurants_path);
  const openRestaurantDatabase = fs.readFileSync(restaurantDatabase, 'utf8');
  const restaurantList: Restaurant[] = JSON.parse(openRestaurantDatabase);

  const the_name = req.body.restaurant_name;
  const searcher = new FuzzySearch(restaurantList, ['restaurant_name'], {
    caseSensitive: false,
    sort: true,
  });

  const result = searcher.search(the_name);

  if (result.length === 0) {
    res.status(404).send('Restaurante não encontrado');
    return;
  }
  res.status(200).send(result);
  return;
};

export const deleteRestaurant = (req: Request, res: Response): void => {
  const restaurantDatabase = path.resolve(restaurants_path);
  const openRestaurantDatabase = fs.readFileSync(restaurantDatabase, 'utf8');
  const restaurantList: Restaurant[] = JSON.parse(openRestaurantDatabase);

  const del_id = req.params.id;

  // Checagem de existência do restaurante
  const restaurantExists = restaurantList.some(
    (restaurant) => restaurant.id === del_id
  );

  if (!restaurantExists) {
    res.status(404).send('Restaurante não encontrado');
    return;
  }

  // Filtrar restaurante a ser deletado
  const newRestaurantList = restaurantList.filter(
    (restaurant) => restaurant.id !== del_id
  );

  // Reescrever o arquivo com a lista de restaurantes atualizada
  fs.writeFileSync(
    restaurantDatabase,
    JSON.stringify(newRestaurantList, null, 2),
    'utf8'
  );

  res.status(200).send('Restaurante deletado com sucesso!');
};
