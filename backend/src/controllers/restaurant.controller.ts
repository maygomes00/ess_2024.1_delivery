import { Request, Response } from 'express';

export const restaurant = async (req: Request, res: Response): Promise<void> => {
  res.json('Restaurant page!!');
};
