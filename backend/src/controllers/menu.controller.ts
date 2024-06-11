import { Request, Response } from 'express';

export const menu = async (req: Request, res: Response): Promise<void> => {
  res.json('Menu page!!');
};
