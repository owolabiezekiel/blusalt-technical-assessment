"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_seeding_1 = require("typeorm-seeding");
var customer_1 = require("../../entity/customer");
(0, typeorm_seeding_1.define)(customer_1.Customer, function (faker) {
    var customer = new customer_1.Customer();
    var firstName = faker.name.firstName();
    var lastName = faker.name.lastName();
    customer.full_name = "".concat(firstName, " ").concat(lastName);
    customer.email = faker.internet.email();
    customer.phone_number = faker.phone.phoneNumber();
    customer.account_number = faker.finance.account(10);
    customer.account_balance = faker.finance.amount(0.0, 1000.0, 2, "", true);
    return customer;
});
