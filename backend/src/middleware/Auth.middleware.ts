import { Request, Response, NextFunction } from 'express';
import { ethers } from 'ethers';

const SESSION_COOKIE = 'siwe-session';

declare global {
    namespace Express {
        interface Request {
            siweAddress?: string;
        }
    }
}

export function requireSiweAuth(req: Request, res: Response, next: NextFunction) {
    const address = req.cookies[SESSION_COOKIE];

    if (!address || !ethers.isAddress(address)) {
        return res.status(401).json({ error: 'Unauthorized: Invalid or missing session.' });
    }

    req.siweAddress = address.toLowerCase();
    next();
}
