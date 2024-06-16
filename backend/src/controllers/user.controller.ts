import path from 'path';
import fs from 'fs';
import { Request, Response } from 'express';

const users_path = './src/data/users/users.json';

// utils
const parser = () => {
  return JSON.parse(fs.readFileSync(path.resolve(users_path), 'utf-8'));
}

const getUser = (id: any) => {
  return parser().find((element: { id: any }) => element.id === parseInt(id));
}

// export functions

export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = parser();
    res.status(200).json(users);
  } catch (error: any) {
    console.log("Error in getAllUsers:", error.message);
    res.status(500).json({
      error: "Internal Server Error"
    });
  }
};

export const getUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = getUser(req.params.userId);
    res.status(200).json(user);
  } catch (error: any) {
    console.log("Error in getUserById:", error.message);
    res.status(500).json({
      error: "Internal Server Error"
    });
  }
};

export const getUserOrders = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = getUser(req.params.userId);
    const orders = user.orders || [];
    res.status(200).json(orders);
  } catch (error: any) {
    console.log("Error in getUserOrders:", error.message);
    res.status(500).json({
      error: "Internal Server Error"
    });
  }
};

// Adicionando as funções de cadastro e manutenção de usuário

export const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = parser();
    const { name, email, password } = req.body;

    const existingUser = users.find((user: any) => user.email === email);
    if (existingUser) {
      res.status(400).json({ error: 'Email já está em uso.' });
      return;
    }

    const newUser = {
      id: users.length + 1,
      name,
      email,
      password,
      orders: []
    };

    users.push(newUser);
    fs.writeFileSync(users_path, JSON.stringify(users, null, 2));

    res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
  } catch (error: any) {
    console.log("Error in registerUser:", error.message);
    res.status(500).json({
      error: "Internal Server Error"
    });
  }
};

export const updateUserDetails = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = parser();
    const userId = parseInt(req.params.userId);
    const { name, email, password } = req.body;

    const userIndex = users.findIndex((user: any) => user.id === userId);

    if (userIndex === -1) {
      res.status(404).json({ error: 'Usuário não encontrado' });
      return;
    }

    const updatedUser = {
      ...users[userIndex],
      name: name || users[userIndex].name,
      email: email || users[userIndex].email,
      password: password || users[userIndex].password,
    };

    users[userIndex] = updatedUser;
    fs.writeFileSync(users_path, JSON.stringify(users, null, 2));

    res.status(200).json({ message: 'Detalhes do usuário atualizados com sucesso!' });
  } catch (error: any) {
    console.log("Error in updateUserDetails:", error.message);
    res.status(500).json({
      error: "Internal Server Error"
    });
  }
};

export const deleteUserAccount = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = parser();
    const userId = parseInt(req.params.userId);

    const userIndex = users.findIndex((user: any) => user.id === userId);

    if (userIndex === -1) {
      res.status(404).json({ error: 'Usuário não encontrado' });
      return;
    }

    users.splice(userIndex, 1);
    fs.writeFileSync(users_path, JSON.stringify(users, null, 2));

    res.status(200).json({ message: 'Conta do usuário deletada com sucesso!' });
  } catch (error: any) {
    console.log("Error in deleteUserAccount:", error.message);
    res.status(500).json({
      error: "Internal Server Error"
    });
  }
};
