import { IUser } from '../interfaces';
import { User } from '../models';

export const createUser = (newUser: IUser) => User.create(newUser);

export const findUserByEmail = (email: string) => User.findOne({ email });

export const findUserById = (id: string) => User.findById(id);

export const findUserByToken = (refreshToken: string) =>
  User.findOne({ refreshToken });

export const updateUserById = (id: string, user: Partial<IUser>) =>
  User.findByIdAndUpdate(id, { $set: user }, { new: true });

export const deleteUserById = (id: string) => User.findByIdAndDelete(id);
