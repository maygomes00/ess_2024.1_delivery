import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { sendEmail } from '../services/email.service';

//Chamando o database JSON
const dbPath = './src/data/users/users.json';

interface User {
  id: number;
  email: string;
  password: string;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
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

const loadUsers = () => {
  const data = fs.readFileSync(dbPath, 'utf-8');
  return JSON.parse(data);
};

const saveUsers = (users: User[]) => {
  fs.writeFileSync(dbPath, JSON.stringify({ users }, null, 2));
};

export const forgotPassword = (req: Request, res: Response) => {
  const { email } = req.body;
  const users = loadUsers().users;
  const user = users.find((u: User) => u.email === email);

  if (!user) {
    return res.status(404).send('User not found');
  }

  const token = jwt.sign({ email }, process.env.JWT_SECRET!, { expiresIn: '1h' });
  user.resetPasswordToken = token;
  user.resetPasswordExpires = new Date(Date.now() + 3600000); // 1 hour

  saveUsers(users);

  const resetUrl = `http://localhost:5001/reset-password/${token}`;

  sendEmail(user.email, 'Esqueci minha senha', `Você está recebendo este e-mail, porque você (ou outra pessoa) solicitou alteração da senha da sua conta.\n\nPor favor, clique no link a seguir ou cole-o em seu navegador preferido para completar este processo:\n\n${resetUrl}\n\nSe você não solicitou esta ação, por ignore este e-mail se sua senha será mantida.\n`);

  res.send('Código enviado para o seu e-mail');
};