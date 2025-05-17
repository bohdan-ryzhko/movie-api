import { UserDto } from '@/dtos';
import { IUser, RefreshBody, UserRequest } from '@/interfaces';
import {
  createUser,
  deleteUserById,
  findUserByEmail,
  findUserByToken,
  updateUserById
} from '@/repositories';
import {
  ctrlWrapper,
  generateAccessAndRefreshTokensUser,
  HttpError
} from '@/utils';

export const checkUserEmailInUse = ctrlWrapper(async (req, res, next) => {
  const { email }: IUser = req.body;

  const user = await findUserByEmail(email);

  if (user)
    next(HttpError({ status: 409, message: res.__('auth.emailInUse') }));

  next();
});

export const userRegistration = ctrlWrapper(async (req, res) => {
  const user: IUser = req.body;
  const translation = res.__;

  const newUser = await createUser(user);

  await newUser.save();

  if (!newUser) throw HttpError({ status: 500, translation });

  const userDto = UserDto(newUser);

  const { accessToken, refreshToken } =
    await generateAccessAndRefreshTokensUser(userDto.id, translation);

  res.status(201).json({
    data: {
      user: userDto,
      accessToken,
      refreshToken
    }
  });
});

export const userLogin = ctrlWrapper(async (req, res) => {
  const { email, password }: IUser = req.body;
  const translation = res.__;

  const foundUser = await findUserByEmail(email);

  const isPasswordValid = await foundUser?.isPasswordCorrect(password);

  if (!(foundUser && isPasswordValid))
    throw HttpError({
      status: 401,
      message: translation('auth.emailOrPwdInvalid')
    });

  const userDto = UserDto(foundUser);

  const { accessToken, refreshToken } =
    await generateAccessAndRefreshTokensUser(userDto.id, translation);

  res.status(201).json({
    data: {
      user: userDto,
      accessToken,
      refreshToken
    }
  });
});

export const userRefresh = ctrlWrapper(async (req, res) => {
  const body: RefreshBody = req.body;
  const translation = res.__;

  const foundUser = await findUserByToken(body.refreshToken);

  if (!foundUser) throw HttpError({ status: 404, translation });

  const userDto = UserDto(foundUser);

  const verifyToken = foundUser.verifyRefreshToken(body.refreshToken);

  if (!verifyToken) throw HttpError({ status: 409, translation });

  const { accessToken, refreshToken } =
    await generateAccessAndRefreshTokensUser(userDto.id, translation);

  res.status(201).json({
    data: {
      user: userDto,
      accessToken,
      refreshToken
    }
  });
});

export const userLogout = ctrlWrapper(async (req: UserRequest, res) => {
  const user = req.user;
  const translation = res.__;

  if (!user) throw HttpError({ status: 401, translation });

  const userDto = UserDto(user);

  await updateUserById(userDto.id, {
    refreshToken: ''
  });

  res.status(200).json({ data: {} });
});

export const getUserInfo = ctrlWrapper(async (req: UserRequest, res) => {
  const user = req.user;
  const translation = res.__;

  if (!user) throw HttpError({ status: 401, translation });

  const userDto = UserDto(user);

  res.status(200).json({ data: { user: userDto } });
});

export const deleteUser = ctrlWrapper(async (req: UserRequest, res) => {
  const user = req.user;
  const translation = res.__;

  if (!user) throw HttpError({ status: 401, translation });

  const userDto = UserDto(user);

  const deletedUser = await deleteUserById(userDto.id);

  if (!deletedUser) throw HttpError({ status: 500, translation });

  res.status(204).json({});
});
