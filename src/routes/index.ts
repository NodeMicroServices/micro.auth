import express from "express";
import { signUpRouter } from "./signup";
import { signInRouter } from "./signin";
import { userInfoRouter } from "./userInfo";
import { signOutRouter } from "./signout";

const router = express.Router();

router.get('/', (_, res) => {
    return res.send('Ping Pong');
});

router.use(signUpRouter);
router.use(signInRouter);
router.use(signOutRouter);
router.use(userInfoRouter);

export { router as authRoutes };
