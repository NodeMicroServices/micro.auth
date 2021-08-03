import express from "express";
import {NotFoundError} from "../errors";

const router = express.Router();

router.post('/sign-in', (req, res) => {
    res.send('logged in successfully!');
});

export { router as signInRouter };
