module.exports = {
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "intheend1",
  database: "blusalt_billing",
  entities: ["src/entity/*.js"],
  logging: false,
  synchronize: true,
};
