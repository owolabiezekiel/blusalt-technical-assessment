import Faker from "faker";
import { define } from "typeorm-seeding";
import { Customer } from "../../entity/customer";

define(Customer, (faker: typeof Faker) => {
  const customer = new Customer();
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();

  customer.full_name = `${firstName} ${lastName}`;
  customer.email = faker.internet.email();
  customer.phone_number = faker.phone.phoneNumber();
  customer.account_number = faker.finance.account(10);
  customer.account_balance = faker.finance.amount(0.0, 1000.0, 2, "", true);

  return customer;
});
