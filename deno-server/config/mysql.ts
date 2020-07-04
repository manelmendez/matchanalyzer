import { Client } from "https://deno.land/x/mysql/mod.ts";

let config: any = {
  host: Deno.env.get('PMA_HOST') || Deno.env.get('MYSQL_PORT_3306_TCP_ADDR') || Deno.env.get('DB_HOST'),
  user: Deno.env.get('DB_USER'),
  password: Deno.env.get('DB_PASS'),
  db: Deno.env.get('DB_NAME'),
  multipleStatements: true,
  poolSize:5
};
console.log(config);

const connection = await new Client().connect(config)
console.log("\n\t *** New connection established with the database. ***");

export default connection
