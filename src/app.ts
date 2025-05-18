import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';

import { i18n } from './i18n';

import { notFound, errorHandler, setDefaultLanguage } from './middlewares';
import { authRouter, moviesRouter, userRouter } from './routes';

import swaggerDocs from '../swagger/swagger.json';

require('dotenv').config();

const app = express();

app.use(setDefaultLanguage);

app.use(i18n.init);
app.use(morgan('dev'));
app.use(helmet());
app.use(
  cors({
    methods: ['GET', 'POST', 'PUT', 'DELETE']
  })
);
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/me', userRouter);
app.use('/api/v1/movies', moviesRouter);

app.use(notFound);
app.use(errorHandler);

export default app;
