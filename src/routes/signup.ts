import express, { Request, Response } from "express";
import { body } from "express-validator";
import jwt from 'jsonwebtoken';

import User from "../models/user";
import {BadRequestError} from "../errors";
import validateRequest from "../middlewares/validateRequest";

const router = express.Router();

const requestValidationRules = [
    body('email')
        .isEmail()
        .withMessage('Email must be valid.'),
    body('password')
        .trim()
        .isLength({ min: 4, max: 20 })
        .withMessage('Password must be between 4 and 20 characters'),
    body('firstName')
        .trim()
        .isLength({ min: 2, max: 20 })
        .withMessage('First name must be between 2 and 20 characters')
];

router.post('/sign-up', validateRequest(requestValidationRules), async (req: Request, res: Response) => {
    const { email, password, firstName, lastName } = req.body;
    const isCurrentUser = await User.findOne({ email });

    if (isCurrentUser) {
        throw new BadRequestError('Email is already in use.');
    }

    const user = User.build({
        email,
        password,
        firstName,
        lastName
    });
    await user.save();

    const userJWT = jwt.sign({
        id: user._id,
        email: user.email
    }, process.env.JWT_KEY!);

    req.session = { jwt: userJWT };

    res.status(201).send({ data: user });
});

export { router as signUpRouter };
