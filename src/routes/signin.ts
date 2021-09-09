import express, {Request, Response} from "express";
import jwt from "jsonwebtoken";
import { body } from "express-validator";
import { validateRequest, BadRequestError } from "@beevk/express-common";
import Password from "../services/password";
import User from "../models/user";

const router = express.Router();

const requestValidationRules = [
    body('email')
        .isEmail()
        .withMessage('Email must be valid.'),
    body('password')
        .trim()
        .notEmpty()
        .withMessage('Password is required.')
];

router.post('/sign-in', validateRequest(requestValidationRules), async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
        throw new BadRequestError('Invalid credentials.');
    }

    const passwordsMatch = await Password.compare(existingUser.password, password);
    if (!passwordsMatch) {
        throw new BadRequestError('Invalid credentials.');
    }

    const userJWT = jwt.sign({
        id: existingUser._id,
        email: existingUser.email
    }, process.env.JWT_KEY!);

    req.session = { jwt: userJWT };
    res.status(200).send({ data: existingUser });
});

export { router as signInRouter };
