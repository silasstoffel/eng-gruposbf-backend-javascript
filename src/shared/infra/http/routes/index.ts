import { Router } from "express";
import { convertRoute } from "./currency-convert";
import { healthCheckRoute } from "./health-check";

const router = Router();

const routers = [
    { path: "/health-check", action: healthCheckRoute },
    { path: "/api/convert", action: convertRoute },
];

for (const route of routers) {
    router.use(route.path, route.action);
}

export { router };
