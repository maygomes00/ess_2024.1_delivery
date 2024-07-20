import { Request, Response } from 'express';
import session from 'express-session';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

// Chamando o database JSON
const dbPath = './src/data/users/users.json';

interface User {
  id: number;
  nome: string;
  email: string;
  password: string;
  telefone: string;
  endereco: string;
}

let currentUser: User | null = null;

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email e senha são obrigatórios' });
    }

    fs.readFile(dbPath, 'utf8', (err, data) => {
      if (err) {
        console.error('Erro ao ler o arquivo:', err);
        return res.status(500).json({ message: 'Server error' });
      }

      const parsedData = JSON.parse(data);
      const users: User[] = parsedData.clientes;
      const user = users.find(u => u.email === email && u.password === password);

      // Verifica se as informações do usuário condizem com o database
      if (user) {
        currentUser = user;
        return res.status(200).json({ message: 'Login successful', id: user.id });
      } else {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
    });
  } catch (error) {
    console.error('Erro no controlador de login:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};
