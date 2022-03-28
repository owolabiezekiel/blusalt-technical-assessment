import { Factory, Seeder } from "typeorm-seeding";
import { Connection } from "typeorm";
import { Customer } from "../../entity/customer";

export default class CreateCustomer implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await factory(Customer)().createMany(5);
  }
}
