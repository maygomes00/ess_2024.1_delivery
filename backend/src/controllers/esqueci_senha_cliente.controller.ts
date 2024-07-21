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
    email: string;
    password: string;
    resetPasswordToken?: string;
    resetPasswordExpires?: Date;
  }
  
  const loadUsers = (): { clientes: User[] } => {
    try {
      const data = fs.readFileSync(dbPath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error loading users:', error);
      return { clientes: [] };
    }
  };
  
  const saveUsers = (clientes: User[]) => {
    try {
      fs.writeFileSync(dbPath, JSON.stringify({ clientes }, null, 2));
    } catch (error) {
      console.error('Error saving users:', error);
    }
  };
  
  export const forgotPassword = (req: Request, res: Response) => {
    try {
      const { email } = req.body;
      console.log('Forgot password request received for email:', email);
      const { clientes } = loadUsers();
      if (!clientes) {
        console.log('No users found in the database.');
        return res.status(500).json({ msg: 'Internal server error', msgCode: 'failure', code: 500 });
      }
      const user = clientes.find((u: User) => u.email === email);
  
      if (!user) {
        console.log('Não foi encontrado nenhum usuário com este e-mail:', email);
        return res.status(404).json({ msg: 'Não foi encontrado nenhum usuário com este e-mail!', msgCode: 'failure', code: 404 });
      }
  
      const token = jwt.sign({ email }, process.env.JWT_SECRET!, { expiresIn: '1h' });
      user.resetPasswordToken = token;
      user.resetPasswordExpires = new Date(Date.now() + 3600000); // 1 hour
  
      saveUsers(clientes);
  
      const resetUrl = `http://localhost:5001/forgot-password/reset/${token}`;
  
      sendEmail(user.email, 'ESS_Delivery | Alteração de Senha', `Você está recebendo este e-mail, porque você solcitou recuperação de sua senha para acessar sua conta.\n\nPor favor, clique no link a seguir ou cole-o em seu navegado favorito para completar o processo:\n${resetUrl}\n\nSe você não realizou esta solicitação, por favor ignore este e-mail e sua senha será mantida.\n`);
  
      res.json({ msg: 'Link para recuperação de sua senha senha foi enviado para o seu e-mail', msgCode: 'success', code: 200 });
    } catch (error) {
      console.error('Error in forgotPassword:', error);
      res.status(500).json({ msg: 'Internal server error', msgCode: 'failure', code: 500 });
    }
  };
  
  export const resetPassword = (req: Request, res: Response) => {
    try {
      const { token } = req.params;
      const { newPassword } = req.body;
      console.log('Reset password request received for token:', token);
  
      const { clientes } = loadUsers();
      if (!clientes) {
        console.log('No users found in the database.');
        return res.status(500).json({ msg: 'Internal server error', msgCode: 'failure', code: 500 });
      }
      const user = clientes.find((u: User) => u.resetPasswordToken === token);
  
      if (!user || !user.resetPasswordExpires || new Date() > new Date(user.resetPasswordExpires)) {
        console.log('Invalid or expired token:', token);
        return res.status(400).json({ msg: 'Token is invalid or has expired', msgCode: 'failure', code: 400 });
      }
  
      user.password = newPassword;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
  
      saveUsers(clientes);
  
      res.json({ msg: 'Senha nova confirmada! Tente fazer login novamente!', msgCode: 'success', code: 200 });
    } catch (error) {
      console.error('Error in resetPassword:', error);
      res.status(500).json({ msg: 'Internal server error', msgCode: 'failure', code: 500 });
    }
  };