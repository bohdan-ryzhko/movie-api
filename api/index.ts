import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerUiDist from 'swagger-ui-dist';

import { i18n } from '../src/i18n';

import { notFound, errorHandler, setDefaultLanguage } from '../src/middlewares';
import { authRouter, moviesRouter, userRouter } from '../src/routes';

import swaggerDocs from '../swagger/swagger.json';

import '../src/scheduler';

require('dotenv').config();

const { PORT = 3000, DB_URL } = process.env;

const CSS_URL =
  'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.21.0/swagger-ui.min.css';

export const app = express();

app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
  })
);

app.use(setDefaultLanguage);
app.use(i18n.init);
app.use(morgan('dev'));
app.use(helmet());
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
  app.use('/api-docs', express.static(swaggerUiDist.getAbsoluteFSPath()));
}
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocs, {
    customCssUrl: CSS_URL
  })
);

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/me', userRouter);
app.use('/api/v1/movies', moviesRouter);

app.use(notFound);
app.use(errorHandler);

mongoose
  .connect(`${DB_URL}`)
  .then(() => {
    app.listen(PORT, () => {
      console.log(
        `Database connection successful, listening: http://localhost:${PORT}`
      );
    });
  })
  .catch(error => {
    console.log('error', error);
    process.exit(1);
  });

export default app;
