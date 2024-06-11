import path from 'path'
import fs from 'fs'
import { Request, Response } from 'express';

const users_path = './src/data/users/users.json'

// utils
const parser = () => {
  return JSON.parse(fs.readFileSync(path.resolve(users_path), 'utf-8'))
}

const getUser = (id: any) => {
  return parser().find((element: { id: any }) => element.id === parseInt(id))
}

// export functions

export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  res.json('Usuarios');
};

// fazer POST PUT DELETE do usuário

export const getUserById = async (req: Request, res: Response): Promise<void> => {
  try {

    const user = getUser(req.params.userId)
    res.status(200).json(user)
      
  } catch(error : any) {
      console.log("Error in getUserById:", error.message)
      res.status(500).json({
          error: "Internal Server Error"
      })
  }
};

export const getUserOrders = async (req: Request, res: Response): Promise<void> => {
  try {

    const user = getUser(req.params.userId)
    const orders = user.orders || []
    res.status(200).json(orders)
      
  } catch(error : any) {
      console.log("Error in getUserOrders:", error.message)
      res.status(500).json({
          error: "Internal Server Error"
      })
  }
};