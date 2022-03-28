module.exports = {
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "intheend1",
  database: "blusalt_customer",
  entities: ["src/entity/*.js"],
  logging: false,
  synchronize: true,
  seeds: ["src/db/seeds/**/*{.ts,.js}"],
  factories: ["src/db/factories/**/*{.ts,.js}"],
};
