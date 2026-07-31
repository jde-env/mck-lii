import { Request, Response } from 'express';
import userService from './userService';

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  const users = await userService.getAllUsers();
  res.status(200).json(users);
};

export const getUserById = async (req: Request, res: Response): Promise<void> => {
  const user = await userService.getUserById(req.params.id);
  if (!user) {
    res.status(404).json({ message: 'User not found' });
    return;
  }
  res.status(200).json(user);
};