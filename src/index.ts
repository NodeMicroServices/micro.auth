import express from 'express';
import 'express-async-errors';
import morgan from 'morgan';
import mongoose from 'mongoose';

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

const startServer = async () => {
    try {
        await mongoose.connect('mongodb://auth-mongo-srv:27017/auth', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.info('Connected to DB!');
    } catch (e) {
        console.error('Connecting to DB failed!', e);
    }

    app.listen(3000, () => {
        console.log('Auth server started on port: 3000');
    });
}

startServer();

