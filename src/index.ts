import express from 'express';
import morgan from 'morgan';

import { authRoutes } from "./routes";
import errorHandler from "./middlewares/errorHandler";

const app = express();

app.use(express.json());
app.use(morgan('tiny'));

app.use('/users', authRoutes);

app.use(errorHandler);

app.listen(3000, () => {
    console.log('Auth server started on port: 3000');
})
