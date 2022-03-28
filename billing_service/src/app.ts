import * as express from "express";
import { Request, Response } from "express";
import { createConnection } from "typeorm";
import { Billing } from "./entity/billing";
import * as amqp from "amqplib/callback_api";

createConnection()
  .then((db) => {
    const billingRepository = db.getRepository(Billing);

    amqp.connect(
      "amqps://urpyormt:kZSThtc9hilGyHDyobXuSxRQ12i7aP7K@beaver.rmq.cloudamqp.com/urpyormt",
      (connectError, connection) => {
        if (connectError) {
          throw connectError;
        }

        connection.createChannel((createChannelError, channel) => {
          if (createChannelError) {
            throw createChannelError;
          }

          channel.assertQueue("transaction", { durable: false });

          const app = express();
          app.use(express.json());

          channel.consume("transaction", (message) => {
            console.log(message.content.toString());
          });

          app.listen(8081);
          console.log("Billing service started......");
        });
      }
    );
  })
  .catch((error) => console.log(error));
