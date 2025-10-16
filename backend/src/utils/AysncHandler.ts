import { Request, Response, NextFunction, RequestHandler } from 'express';

type AsyncHandlerFunction = (
    req: Request,
    res: Response,
    next: NextFunction
) => Promise<any>;

const AsyncHandler = (fn: AsyncHandlerFunction): RequestHandler => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};

export { AsyncHandler };
