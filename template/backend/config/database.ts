import { Sequelize } from "sequelize";

const sequelize = new Sequelize("yourdatabase", "youruser", "yourpassword", {
  host: "host.docker.internal",
  port: 5435,
  dialect: "postgres",
});

export default sequelize;
