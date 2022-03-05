import Fastify from "fastify";
import FastifyWS from "fastify-websocket";
import { Sequelize } from "sequelize";
import Chat from "./models/Chat.js";
import { root } from "./routes/routes.js";
export const fastify = Fastify({ logger: false });
fastify.register(FastifyWS);

fastify.get("/", root);
const chat = new Chat();

fastify.get("/users", async (_req, res) => {
  res.send({
    user: JSON.stringify(Chat.USERS),
  });
});

// Start the server
const server = async () => {
  try {
    await fastify.listen(4000);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
const sequelize = new Sequelize("chat", "root", "root", {
  host: "localhost",
  dialect: "mysql",
});
try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
server();
