"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var typeorm_1 = require("typeorm");
var billing_1 = require("./entity/billing");
var amqp = require("amqplib/callback_api");
(0, typeorm_1.createConnection)()
    .then(function (db) {
    var billingRepository = db.getRepository(billing_1.Billing);
    amqp.connect("amqps://urpyormt:kZSThtc9hilGyHDyobXuSxRQ12i7aP7K@beaver.rmq.cloudamqp.com/urpyormt", function (connectError, connection) {
        if (connectError) {
            throw connectError;
        }
        connection.createChannel(function (createChannelError, channel) {
            if (createChannelError) {
                throw createChannelError;
            }
            channel.assertQueue("transaction", { durable: false });
            var app = express();
            app.use(express.json());
            channel.consume("transaction", function (message) {
                console.log(message.content.toString());
            });
            app.listen(8081);
            console.log("Billing service started......");
        });
    });
})
    .catch(function (error) { return console.log(error); });
