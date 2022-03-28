"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var typeorm_1 = require("typeorm");
(0, typeorm_1.createConnection)()
    .then(function (db) {
    var app = express();
    app.use(express.json());
    app.listen(8080);
    console.log("Hello world");
})
    .catch(function (error) { return console.log(error); });
