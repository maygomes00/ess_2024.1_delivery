import { Request, Response } from 'express';

export const category = async (req: Request, res: Response): Promise<void> => {
  res.json('Category page!!');
};

export const category1 = async (req: Request, res: Response): Promise<void> => {
    res.json('Category1 page!!');
  };