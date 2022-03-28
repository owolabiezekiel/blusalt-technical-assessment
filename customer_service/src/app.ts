import * as express from "express";
import { Request, Response } from "express";
import { createConnection } from "typeorm";
import { Customer } from "./entity/customer";
import * as amqp from "amqplib/callback_api";

createConnection()
  .then((db) => {
    const customerRepository = db.getRepository(Customer);
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

          const app = express();
          app.use(express.json());

          app.get(
            "/customer/getcustomer",
            async (req: Request, res: Response) => {
              const customer = await customerRepository.findOne(req.body.id);
              res.json(customer);
            }
          );

          app.get(
            "/customer/getcustomers",
            async (req: Request, res: Response) => {
              const customer = await customerRepository.find();
              res.json(customer);
            }
          );

          app.post("/customer/fundaccount", (req: Request, res: Response) => {
            channel.sendToQueue("transaction", Buffer.from("HI"));
            res.json(req.body);
          });

          app.listen(8080);
          console.log("Hello world");
        });
      }
    );
  })
  .catch((error) => console.log(error));
