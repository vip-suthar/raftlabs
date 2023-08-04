import dotenv from "dotenv";
dotenv.config();

import express, { Express } from "express";
import { Server } from "http";
import morgan from "morgan";
import cors from "cors";
import { Server as SocketIOServer } from "socket.io";

import apiRouter from "./src/routes";
import { checkServices } from "./src/middlewares/checkServices";
import errorRequestHandler from "./src/middlewares/errorHandler";
import connectServices from "./src/utils/connectServices";
import { serverConfig } from "./src/config";
import configureSocket from "./src/websocket/socket";

// Constants
const PORT: number = serverConfig.PORT;

// App
const app: Express = express();
const server: Server = new Server(app);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(morgan("combined"));

// API Routes
app.use("/api/", checkServices, apiRouter);
app.get("*", (req, res) => {
  res.send("Welcome to API");
})
/* Error handler middleware */
app.use(errorRequestHandler);

const io = new SocketIOServer(server);
configureSocket(io);

try {

  connectServices().then(() => {
    server.listen(PORT, () => {
      console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
    });
  });

} catch (err: any) {
  console.log("some error occured while connecting to services");
  process.exit();
}

export default app;
