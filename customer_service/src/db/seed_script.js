const mysql = require(mysql);
const fs = require("fs");

// Read SQL seed query for customer
const customerSeedQuery = fs.readFileSync("db/seed_customer.sql", {
  encoding: "utf-8",
});

// Connect to database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "intheend1",
  database: "blusalt_customer",
  multipleStatements: true,
});
connection.connect();
console.log("Running SQL seed...");

// Run seed query
connection.query(seedQuery, [hash], (err) => {
  if (err) {
    throw err;
  }

  console.log("SQL seed completed! Password for initial admin account: " + psw);
  connection.end();
});
