import { RequestHandler } from "express";
import jwt from 'jsonwebtoken';

import { AuthorizationError } from '../errors';

interface IUserPayload {
    id: string;
    email: string;
}

// Modify existing interface (Request of Express) to add custom property
declare global {
    namespace Express {
        interface Request {
            currentUser?: IUserPayload;
        }
    }
}

const currentUser: RequestHandler = (req, res, next ) => {
    if (!req.session?.jwt) {
        return next();
    }
    try {
        req.currentUser = jwt.verify(req.session.jwt, process.env.JWT_KEY!) as IUserPayload;
        return next();
    } catch (e) {
        return next();
    }
}

export default currentUser;
