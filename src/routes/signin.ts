import express from "express";

const router = express.Router();

router.post('/sign-in', (req, res) => {
    res.send('logged in successfully!');
});

export { router as signInRouter };
