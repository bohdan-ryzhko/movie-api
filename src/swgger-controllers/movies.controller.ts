/* eslint-disable @typescript-eslint/no-unused-vars */
import { IMovieDto, Translate } from '../interfaces';
import {
  Body,
  Controller,
  Delete,
  Example,
  Get,
  Path,
  Post,
  Put,
  Response,
  Route,
  Security,
  SuccessResponse,
  Tags
} from 'tsoa';

class MovieInfo {
  data!: {
    movies: IMovieDto[];
  };
}

export interface CreateMovieDto {
  description: Translate;
  release_date: string;
  name: Translate;
  rating: number;
}

export interface UpdateMovieDto {
  description?: Translate;
  release_date?: string;
  name?: Translate;
  rating?: number;
}

const exampleMoviesData: MovieInfo = {
  data: {
    movies: [
      {
        id: '123',
        name: 'Inception',
        description: 'Mind-bending thriller',
        release_date: '2010-07-16',
        userId: 'sss-ddd',
        rating: 3.9
      }
    ]
  }
};

@Route('api/v1/movies')
@Tags('Movies')
export class MovieController extends Controller {
  /**
   * Get all movies for the authenticated user
   */
  @Get('/')
  @Security('bearer')
  @SuccessResponse('200', 'Movies information successfully retrieved')
  @Response(401, 'Unauthorized')
  @Response(404, 'Not found')
  @Example<{ data: { movies: IMovieDto[] } }>(exampleMoviesData)
  public async getMovies(): Promise<{ data: { movies: IMovieDto[] } }> {
    return exampleMoviesData;
  }

  /**
   * Get single movie by id
   * @param id Movie id
   */
  @Get('{id}')
  @Security('bearer')
  @SuccessResponse('200', 'Movie information successfully retrieved')
  @Response(401, 'Unauthorized')
  @Response(404, 'Not found')
  public async getMovie(
    @Path() id: string
  ): Promise<{ data: { movie: IMovieDto } }> {
    return {
      data: {
        movie: exampleMoviesData.data.movies[0]
      }
    };
  }

  /**
   * Create a new movie
   * @param requestBody Movie data to create
   */
  @Post('/')
  @Security('bearer')
  @SuccessResponse('201', 'Movie successfully created')
  @Response(401, 'Unauthorized')
  @Response(400, 'Bad request')
  public async createMovie(
    @Body() requestBody: CreateMovieDto
  ): Promise<{ data: { movie: IMovieDto } }> {
    this.setStatus(201);
    return {
      data: {
        movie: exampleMoviesData.data.movies[0]
      }
    };
  }

  /**
   * Update an existing movie
   * @param id Movie id to update
   * @param requestBody Partial movie data to update
   */
  @Put('{id}')
  @Security('bearer')
  @SuccessResponse('201', 'Movie successfully updated')
  @Response(401, 'Unauthorized')
  @Response(404, 'Not found')
  @Response(400, 'Bad request')
  public async updateMovie(
    @Path() id: string,
      @Body() requestBody: UpdateMovieDto
  ): Promise<{ data: { movie: IMovieDto } }> {
    this.setStatus(201);
    return {
      data: {
        movie: exampleMoviesData.data.movies[0]
      }
    };
  }

  /**
   * Delete a movie by id
   * @param id Movie id to delete
   */
  @Delete('{id}')
  @Security('bearer')
  @SuccessResponse('204', 'Movie successfully deleted')
  @Response(401, 'Unauthorized')
  @Response(404, 'Not found')
  public async deleteMovie(@Path() id: string): Promise<void> {
    this.setStatus(204);
  }
}
