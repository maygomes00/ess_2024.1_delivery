import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { sendEmail } from '../services/email.service';
import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

//Chamando o database JSON
const dbPath = './src/data/users/users.json';

interface User {
  id: number;
  nome: string;
  email: string;
  password: string;
  telefone: string;
  endereco: string;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
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
        return res.status(200).json({ message: 'Login successful' });
      } else {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
    });
  } catch (error) {
    console.error('Erro no controlador de login:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

export const logout = (req: Request, res: Response) => {
  if (currentUser) {
    currentUser = null;
    return res.status(200).json({ message: 'Logout successful' });
  } else {
    return res.status(400).json({ message: 'No user is logged in' });
  }
};

const loadUsers = (): { users: User[] } => {
  const data = fs.readFileSync(dbPath, 'utf-8');
  return JSON.parse(data);
};

const saveUsers = (users: User[]) => {
  fs.writeFileSync(dbPath, JSON.stringify({ users }, null, 2));
};

export const forgotPassword = (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const { users } = loadUsers();
    const user = users.find((u: User) => u.email === email);

    if (!user) {
      return res.status(404).json({ msg: 'User not found', msgCode: 'failure', code: 404 });
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET!, { expiresIn: '1h' });
    user.resetPasswordToken = token;
    user.resetPasswordExpires = new Date(Date.now() + 3600000); // 1 hour

    saveUsers(users);

    const resetUrl = `http://localhost:3000/reset-password/${token}`;

    sendEmail(user.email, 'Password Reset', `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\nPlease click on the following link, or paste this into your browser to complete the process:\n\n${resetUrl}\n\nIf you did not request this, please ignore this email and your password will remain unchanged.\n`);

    res.json({ msg: 'Password reset link sent to your email', msgCode: 'success', code: 200 });
  } catch (error) {
    res.status(500).json({ msg: 'Internal server error', msgCode: 'failure', code: 500 });
  }
};

export const resetPassword = (req: Request, res: Response) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;

    const { users } = loadUsers();
    const user = users.find((u: User) => u.resetPasswordToken === token);

    if (!user || !user.resetPasswordExpires || new Date() > new Date(user.resetPasswordExpires)) {
      return res.status(400).json({ msg: 'Token is invalid or has expired', msgCode: 'failure', code: 400 });
    }

    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    saveUsers(users);

    res.json({ msg: 'Password has been reset', msgCode: 'success', code: 200 });
  } catch (error) {
    res.status(500).json({ msg: 'Internal server error', msgCode: 'failure', code: 500 });
  }
};