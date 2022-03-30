import * as express from "express";
import { Request, Response } from "express";
import { createConnection } from "typeorm";
import { Customer } from "./entity/customer";
import * as amqp from "amqplib/callback_api";
import axios from "axios";

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

          app.post(
            "/customer/fundaccount",
            async (req: Request, res: Response) => {
              const customer_id = req.body.customer_id;
              if (customer_id === null || customer_id == null) {
                res.sendStatus(400).send("Please input customer id");
                throw new Error("Please provide customer id");
              }

              const customer = await customerRepository.findOne(customer_id);
              if (!customer) {
                res.sendStatus(404).send("User not found");
              }

              // console.log("Queing transaction for processing.........");
              // channel.sendToQueue(
              //   "transaction_created",
              //   Buffer.from(JSON.stringify(req.body))
              // );

              const responseFromBillingService = await axios.post(
                "http://localhost:8081/billing/createTransaction",
                req.body
              );

              return res.send(responseFromBillingService.data);
            }
          );

          app.listen(8080);
          console.log("Customer Service Started....");
          process.on("beforeExit", () => {
            console.log("Closing message queue connection");
            connection.close();
          });
        });
      }
    );
  })
  .catch((error) => console.log(error));
