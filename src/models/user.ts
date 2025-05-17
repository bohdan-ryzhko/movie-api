import { model, Schema } from 'mongoose';
import { AuthHelperDocument, IUserDocument } from '@/interfaces';
import { emailRegex } from '@/constants';
import {
  comparePasswords,
  generateAccessToken,
  generateRefreshToken,
  hashPassword,
  verifyRefreshToken
} from '@/middlewares';

require('dotenv').config();

const {
  USERS_SECRET_KEY = '',
  USERS_REFRESH_SECRET_KEY = '',
  ACCESS_TOKEN_EXPIRES_IN = '1h',
  REFRESH_TOKEN_EXPIRES_IN = '7h'
} = process.env;

const userSchema = new Schema<IUserDocument>({
  email: {
    type: String,
    match: emailRegex,
    required: [true, 'Email is required'],
    unique: true
  },
  password: {
    type: String,
    minlength: 6,
    required: [true, 'Password is required']
  },
  refreshToken: {
    type: String
  }
});

userSchema.pre('save', function (next) {
  hashPassword.call(this as unknown as AuthHelperDocument, next);
});

// Method to check if the entered password is correct
userSchema.methods.isPasswordCorrect = async function (password: string) {
  return await comparePasswords.call(this as AuthHelperDocument, password);
};

// Method to generate an access token
userSchema.methods.generateAccessToken = function () {
  return generateAccessToken.call(
    this as AuthHelperDocument,
    USERS_SECRET_KEY,
    ACCESS_TOKEN_EXPIRES_IN
  );
};

// Method to generate a refresh token
userSchema.methods.generateRefreshToken = function () {
  return generateRefreshToken.call(
    this as AuthHelperDocument,
    USERS_REFRESH_SECRET_KEY,
    REFRESH_TOKEN_EXPIRES_IN
  );
};

userSchema.methods.verifyRefreshToken = function (refreshToken: string) {
  return verifyRefreshToken.call(
    this as AuthHelperDocument,
    refreshToken,
    USERS_REFRESH_SECRET_KEY
  );
};

export const User = model<IUserDocument>('User', userSchema);
