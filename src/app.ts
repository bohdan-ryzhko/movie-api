import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';

import { i18n } from '@/i18n';

import { notFound, errorHandler, setDefaultLanguage } from '@/middlewares';
import { authRouter, userRouter } from '@/routes';

require('dotenv').config();

const app = express();

app.use(setDefaultLanguage);

app.use(i18n.init);
app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/me', userRouter);

app.use(notFound);
app.use(errorHandler);

export default app;
