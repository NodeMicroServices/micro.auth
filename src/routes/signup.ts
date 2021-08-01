import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";

const router = express.Router();

const dataVerificationMiddleware = [
    body('email')
        .isEmail()
        .withMessage('Email must be valid.'),
    body('password')
        .trim()
        .isLength({ min: 4, max: 20 })
        .withMessage('Password must be between 4 and 20 characters')
];

router.post('/sign-up', dataVerificationMiddleware, (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send(errors.array());
    }
    const { email, password } = req.body;
    console.log('Creating USER');
    res.send('Registered Successfully!');
});

export { router as signUpRouter };
