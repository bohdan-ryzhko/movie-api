import { IUserDto } from '../interfaces';
import {
  Body,
  Controller,
  Delete,
  Example,
  Get,
  Response,
  Route,
  Security,
  SuccessResponse,
  Tags
} from 'tsoa';

class UserInfo {
  data!: {
    user: IUserDto;
  };
}

const exampleData: UserInfo = {
  data: {
    user: {
      id: '123',
      email: 'test@example.com'
    }
  }
};

@Route('api/v1/me')
@Tags('User')
export class UserController extends Controller {
  /**
   * Get information about the current authenticated user
   */
  @Get('/')
  @Security('bearer')
  @SuccessResponse('200', 'User information successfully retrieved')
  @Response(404, 'User not found')
  @Response(401, 'Unauthorized')
  @Example<UserInfo>(exampleData)
  public async getUserInfo(): Promise<UserInfo> {
    return exampleData;
  }

  /**
   * Delete the current authenticated user account
   */
  @Delete('/')
  @Security('bearer')
  @SuccessResponse('204', 'User account has been successfully deleted')
  @Response(404, 'User not found')
  @Response(401, 'Unauthorized')
  public async deleteUser(): Promise<void> {
    return;
  }
}
