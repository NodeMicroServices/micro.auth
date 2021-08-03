import express from "express";
import {NotFoundError} from "../errors";

const router = express.Router();

router.get('/me', (req, res) => {
    throw new NotFoundError();
    res.send('Hello Stranger!');
});

export { router as userInfoRouter };
