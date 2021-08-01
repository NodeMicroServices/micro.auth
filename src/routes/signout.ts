import express from "express";

const router = express.Router();

router.post('/sign-out', (req, res) => {
    res.send('Logged Out Successfully!');
});

export { router as signOutRouter };
