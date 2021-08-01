import express from "express";

const router = express.Router();

router.get('/me', (req, res) => {
    res.send('Hello Stranger!');
});

export { router as userInfoRouter };
