import express from "express";
import cors from "cors";
import { json } from "express";
import { userController } from "./controller/user-controller";
import dotenv from "dotenv";
import { setupSwagger } from "./swagger/swagger";
import { activityController } from "./controller/activity-controller";
import { authController } from "./controller/auth-controller";
import { createBucket } from "./service/s3-service";
import { insertData } from "./repository/dml/insert-data";

const server = express();
dotenv.config();
server.use(json());
server.use(cors());
setupSwagger(server);
authController(server);
userController(server);
activityController(server);

const start = async () => {
  await createBucket();
  await insertData(); 
};

start();

const port = process.env.PORT;

server.listen(port, () => {
  console.log("Rodando na porta " + port);
});
