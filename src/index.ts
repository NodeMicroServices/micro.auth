import express from 'express';
import 'express-async-errors';
import morgan from 'morgan';
import mongoose from 'mongoose';
import cookieSession from "cookie-session";

import { authRoutes } from "./routes";
import errorHandler from "./middlewares/errorHandler";
import { NotFoundError } from "./errors";

const app = express();

// Make Express aware that SSL cert (for HTTPS) is proxied
app.set('trust proxy', true);

app.use(express.json());
app.use(morgan('tiny'));

// Add secure: true => to enable sharing cookie only through HTTPS
app.use(cookieSession({
    signed: false,
    secure: true
}));

app.use('/users', authRoutes);

app.all('*', async () => {
    throw new NotFoundError();
})

app.use(errorHandler);

const startServer = async () => {
    if (!process.env.JWT_KEY) {
        throw new Error('JWT_KEY must be found.');
    }
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

