import jwt from 'jsonwebtoken';
import { Request } from 'express';

export interface IUser {
  _id: string;
  email: string;
  password: string;
  refreshToken?: string;
}

export interface IUserDto extends Omit<IUser, '_id' | 'password'> {
  id: string;
}

export interface IUserDocument extends IUser, Document {
  isPasswordCorrect(password: string): Promise<boolean>;
  generateAccessToken(): string;
  generateRefreshToken(): string;
  verifyRefreshToken(refreshToken: string): string | jwt.JwtPayload;
}

export interface UserRequest extends Request {
  user?: IUserDocument;
}
