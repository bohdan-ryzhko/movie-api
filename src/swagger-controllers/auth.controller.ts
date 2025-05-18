import {
  Controller,
  Post,
  Put,
  Route,
  Tags,
  Body,
  Response,
  Example,
  Security,
  SuccessResponse
} from 'tsoa';
import { IUser, IUserDto } from '../interfaces';

interface AuthResponse {
  user: Omit<IUserDto, 'refreshToken'>;
  accessToken: string;
  refreshToken: string;
}

interface RefreshBody {
  refreshToken: string;
}

type UserPayload = Pick<IUser, 'email' | 'password'>;

@Route('api/v1/auth')
@Tags('Auth')
export class AuthController extends Controller {
  /**
   * User Registration
   * @param requestBody User registration data
   */
  @Post('/registration')
  @SuccessResponse('201', 'User successfully registered')
  @Response(409, 'Email already in use')
  @Example<AuthResponse>({
    user: {
      id: '123',
      email: 'test@example.com'
    },
    accessToken: 'some-access-token',
    refreshToken: 'some-refresh-token'
  })
  public async registration(
    @Body() requestBody: UserPayload
  ): Promise<AuthResponse> {
    return {
      user: {
        id: '123',
        email: requestBody.email
      },
      accessToken: 'some-access-token',
      refreshToken: 'some-refresh-token'
    } as AuthResponse;
  }

  /**
   * User Login
   * @param requestBody User login data
   */
  @Post('/login')
  @SuccessResponse(201, 'User successfully logged in')
  @Response(400, 'Invalid email or password')
  @Example<AuthResponse>({
    user: {
      id: '123',
      email: 'test@example.com'
    },
    accessToken: 'some-access-token',
    refreshToken: 'some-refresh-token'
  })
  public async login(@Body() requestBody: UserPayload): Promise<AuthResponse> {
    return {
      user: {
        id: '123',
        email: requestBody.email
      },
      accessToken: 'some-access-token',
      refreshToken: 'some-refresh-token'
    } as AuthResponse;
  }

  /**
   * Refresh Token
   * @param requestBody Refresh token data
   */
  @Post('/refresh')
  @SuccessResponse(201, 'Token successfully refreshed')
  @Response(404, 'User not found')
  @Response(409, 'Invalid refresh token')
  @Example<AuthResponse>({
    user: {
      id: '123',
      email: 'test@example.com'
    },
    accessToken: 'new-access-token',
    refreshToken: 'new-refresh-token'
  })
  public async refresh(
    @Body() requestBody: RefreshBody
  ): Promise<AuthResponse> {
    return {
      user: {
        id: '123',
        email: 'test@example.com'
      },
      accessToken: 'some-access-token',
      refreshToken: requestBody.refreshToken
    } as AuthResponse;
  }

  /**
   * User Logout
   */
  @Put('/logout')
  @Security('bearer')
  @Response(200, 'User successfully logged out')
  @Response(401, 'Unauthorized')
  public async logout(): Promise<void> {
    return;
  }
}
