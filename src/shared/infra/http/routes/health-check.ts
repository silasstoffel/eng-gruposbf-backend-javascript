import { Router, Response, Request } from "express";

const healthCheckRoute = Router();

healthCheckRoute.get("/", (req: Request, res: Response) => {
    res.json({ status: 'health', datetime: new Date() })
});

export { healthCheckRoute };
