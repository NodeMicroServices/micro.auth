import express from 'express';
import 'express-async-errors';
import morgan from 'morgan';
import cookieSession from "cookie-session";
import cors from 'cors';
import { errorHandler } from "@beevk/express-common";
import { NotFoundError } from "@beevk/express-common";

import { authRoutes } from "./routes";

const app = express();

// Make Express aware that SSL cert. (for HTTPS) is proxied
app.set('trust proxy', true);

app.use(express.json());
app.use(morgan('tiny'));

// Add secure: true => to enable sharing cookie only through HTTPS
app.use(cookieSession({
    signed: false,
    secure: false //process.env.NODE_ENV !== 'test'
}));

//Change this later
app.use(cors());

app.use('/api/users', authRoutes);

app.all('*', async () => {
    throw new NotFoundError();
})

app.use(errorHandler);

export default app;
