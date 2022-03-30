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

          channel.assertQueue("process_billing", { durable: false });

          const app = express();
          app.use(express.json());

          channel.consume(
            "process_billing",
            async (message) => {
              const payload = JSON.parse(message.content.toString());
              const customer_id = payload.customer_id;
              const customer = await customerRepository.findOne(customer_id);
              customer.account_balance =
                customer.account_balance + payload.amount;
              const updateCustomer = await customerRepository.save(customer);
              console.log(
                "Billing processed successfully\nNew balance: " +
                  customer.account_balance +
                  "\nSending event to update billing status"
              );

              if (updateCustomer) {
                channel.sendToQueue(
                  "update_billing_status",
                  Buffer.from(
                    JSON.stringify({ id: payload.id, status: "completed" })
                  )
                );
              } else {
                channel.sendToQueue(
                  "update_billing_status",
                  Buffer.from(
                    JSON.stringify({ id: payload.id, status: "failed" })
                  )
                );
              }
            },
            { noAck: true }
          );

          app.listen(8082);
          console.log("Billing worker service started......");
          process.on("beforeExit", () => {
            console.log("Closing message queue connection");
            connection.close();
          });
        });
      }
    );
  })
  .catch((error) => console.log(error));
