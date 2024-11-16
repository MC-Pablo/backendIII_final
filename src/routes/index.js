import { Router } from "express";
import usersRouter from "./api/users.router.js";
import sessionsRouter from "./api/sessions.router.js";
import mocksRouter from "./mocks.router.js";
import petsRouter from "./api/pets.router.js";
import adoptionRouter from "./api/adoption.router.js";

const indexApiRouter = Router();
indexApiRouter.use("/api/users", usersRouter);
indexApiRouter.use("/api/sessions", sessionsRouter);
indexApiRouter.use("/api/pets", petsRouter);
indexApiRouter.use("/api/mocks", mocksRouter);
indexApiRouter.use("api/adoptions", adoptionRouter);

export default indexApiRouter;
