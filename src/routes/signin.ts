import express from "express";
import {NotFoundError} from "../errors";

const router = express.Router();

router.post('/sign-in', (req, res) => {
    throw new NotFoundError();
    res.send('logged in successfully!');
});

export { router as signInRouter };
