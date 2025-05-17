import { IUserDto, IUserDocument } from '@/interfaces';

export const UserDto = (user: IUserDocument): IUserDto => ({
  id: user._id,
  email: user.email
});
