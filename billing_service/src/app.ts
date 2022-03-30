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

          channel.assertQueue("update_billing_status", { durable: false });

          channel.consume(
            "update_billing_status",
            async (message) => {
              const payload = JSON.parse(message.content.toString());
              const billingId = payload.id;
              const status = payload.status;
              const billing: Billing = await billingRepository.findOne(
                billingId
              );
              billing.status = status;
              await billingRepository.save(billing);
              console.log(
                "Billing updated successfully\nNew status: " + status
              );
            },
            { noAck: true }
          );

          const app = express();
          app.use(express.json());

          app.post(
            "/billing/createTransaction",
            async (req: Request, res: Response) => {
              const billing: Billing = new Billing();
              const payload = req.body;
              billing.customer_id = payload.customer_id;
              billing.amount = payload.amount;
              console.log(
                "Processing transaction for customer: " +
                  billing.customer_id +
                  " for amount: " +
                  billing.amount
              );

              const saveBilling = await billingRepository.save(billing);
              console.log(saveBilling);
              console.log("Queing transaction for processing.........");
              channel.sendToQueue(
                "process_billing",
                Buffer.from(JSON.stringify(saveBilling))
              );

              res.send(JSON.stringify(saveBilling));
            }
          );

          app.listen(8081);
          console.log("Billing service started......");
          process.on("beforeExit", () => {
            console.log("Closing message queue connection");
            connection.close();
          });
        });
      }
    );
  })
  .catch((error) => console.log(error));
