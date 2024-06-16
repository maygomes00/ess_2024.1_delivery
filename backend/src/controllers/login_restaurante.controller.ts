import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

//Chamando o database JSON
const dbPath = './src/data/restaurants/restaurants.json';

interface User {
  id: number;
  email: string;
  password: string;
}

let currentUser: User | null = null;

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  fs.readFile(dbPath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Server error' });
    }

    const users: User[] = JSON.parse(data);
    const user = users.find(u => u.email === email && u.password === password);

    //Verifica se as informações do usuário condizem com o database
    if (user) {
      currentUser = user;
      return res.status(200).json({ message: 'Login successful' });
    } else {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
  });
};

export const logout = (req: Request, res: Response) => {
  if (currentUser) {
    currentUser = null;
    return res.status(200).json({ message: 'Logout successful' });
  } else {
    return res.status(400).json({ message: 'No user is logged in' });
  }
};