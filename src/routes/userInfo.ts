import express from "express";
import { currentUser } from "@beevk/express-common";

const router = express.Router();

router.get('/me', currentUser, (req, res) => {
    return res.send({
        data: req.currentUser || null
    });
});

export { router as userInfoRouter };
