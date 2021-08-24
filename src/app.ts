import express from 'express';
import 'express-async-errors';
import morgan from 'morgan';
import cookieSession from "cookie-session";

import { authRoutes } from "./routes";
import errorHandler from "./middlewares/errorHandler";
import { NotFoundError } from "./errors";

const app = express();

// Make Express aware that SSL cert. (for HTTPS) is proxied
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

export default app;
