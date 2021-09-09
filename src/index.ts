import mongoose from 'mongoose';

import app from "./app";

const startServer = async () => {
    if (!process.env.JWT_KEY) {
        throw new Error('JWT_KEY must be defined.');
    }
    if (!process.env.MONGO_URI) {
        throw new Error('MONGO_URI must be defined.');
    }
    try {
        await mongoose.connect(`${process.env.MONGO_URI}`, {
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

