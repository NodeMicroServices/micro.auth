import express from "express";

import currentUser from "../middlewares/currentUser";

const router = express.Router();

router.get('/me', currentUser, (req, res) => {
    return res.send({
        data: req.currentUser || null
    });
});

export { router as userInfoRouter };
