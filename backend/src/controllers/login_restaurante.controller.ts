import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { User, Restaurant } from './login_common_interfaces';

const dbPath = './src/data/restaurants/restaurants.json';
const userHandlingPath = './src/data/users/r_user_handling.json';

let currentUser: User | null = null;

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  fs.readFile(dbPath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Server error' });
    }

    const registered_restaurants: Restaurant[] = JSON.parse(data);
    const logged_restaurant = registered_restaurants.find(
      (u) => u.email === email && u.password === password
    );

    if (logged_restaurant) {
      currentUser = {
        id: logged_restaurant.id,
        email: logged_restaurant.email,
        password: logged_restaurant.password,
      };

      let current_user_db: User[] = [];
      current_user_db.push(currentUser);
      fs.writeFileSync(
        path.resolve(userHandlingPath),
        JSON.stringify(current_user_db)
      );

      return res.status(200).json({ message: 'Login successful' });
    } else {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
  });
};

export const logout = (req: Request, res: Response) => {
  fs.readFile(path.resolve(userHandlingPath), 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Server error' });
    }

    const current_user_db: User[] = JSON.parse(data);

    if (current_user_db.length > 0) {
      fs.writeFile(
        path.resolve(userHandlingPath),
        JSON.stringify([]),
        (writeErr) => {
          if (writeErr) {
            return res.status(500).json({ message: 'Server error' });
          }
          return res.status(200).json({ message: 'Logout successful' });
        }
      );
    } else {
      return res.status(404).json({ message: 'No user currently logged in' });
    }
  });
};
