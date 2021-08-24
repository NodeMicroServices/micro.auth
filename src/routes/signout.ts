import express from "express";

const router = express.Router();

router.post('/sign-out', (req, res) => {
    req.session = null;
    res.send({});
});

export { router as signOutRouter };
