import * as express from "express";
import { createConnection } from "typeorm";
import { connectionDetails } from "../ormconfig";

createConnection()
  .then((db) => {
    const app = express();
    app.use(express.json());
    app.listen(8080);
    console.log("Hello world");
  })
  .catch((error) => console.log(error));
