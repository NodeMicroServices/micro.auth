import { Request, Response, NextFunction } from "express";

import { AuthorizationError } from '../errors';

// This middleware should only be used after calling currentUser middleware
// WIP:: Implement this middleware to check if user has required role

// No Param - Just needs to be logged in (i.e. Any authenticated user)
// String in array - Checks if user has that particular role
const authorize = (requiredRoles?: string[]) => {
    return async (req: Request, _: Response, next: NextFunction) => {
        if (typeof requiredRoles === 'undefined' && req.currentUser) {
            return next();
        }

        // Fetch all the roles of the user
        // Check if any of the userRole matches with requiredRole
        // If it matches, return next(); else
        throw new AuthorizationError();
    };
}


export default authorize;
