import express from "express";
import { connectDB } from "./config/mongoose.config.js";
import cookieParser from "cookie-parser";
import router from "./routes/index.js";

import { errorHandler } from "./errors/errHandler.js";
import { Logger } from "./utils/logger.js";
import { config as DotEnv } from "./config/dotenv.config.js";
import swaggerUiExpress from "swagger-ui-express";
import { specs } from "./config/swagger.config.js";



const server = express();
DotEnv();
server.use(express.urlencoded({ extended: true }));
server.use(express.json());
connectDB();
server.use("/", router);

server.use("/api-docs", swaggerUiExpress.serve, swaggerUiExpress.setup(specs))
// Decodificadores del BODY
server.use(express.urlencoded({ extended: true }));
server.use(express.json());
// Decodificadores de Cookies
server.use(cookieParser());

// Middleware de manejo de errores
server.use(errorHandler);
// Método oyente de solicitudes
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => Logger.info(`Listening on ${PORT}`));