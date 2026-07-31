import User, { IUser } from '../../../models/User';

const getAllUsers = async (): Promise<IUser[]> => {
  return User.find({});
};

const getUserById = async (id: string): Promise<IUser | null> => {
  return User.findById(id);
};

// Other service methods...

export default { getAllUsers, getUserById };
