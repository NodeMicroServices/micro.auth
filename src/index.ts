import express from 'express';
import 'express-async-errors';
import morgan from 'morgan';

import { authRoutes } from "./routes";
import errorHandler from "./middlewares/errorHandler";
import {NotFoundError} from "./errors";

const app = express();

app.use(express.json());
app.use(morgan('tiny'));

app.use('/users', authRoutes);

app.all('*', async () => {
    throw new NotFoundError();
})

app.use(errorHandler);
app.listen(3000, () => {
    console.log('Auth server started on port: 3000');
})
