import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  process.env.DATABASE_NAME as string,
  process.env.DATABASE_USERNAME as string,
  process.env.DATABASE_PASSWORD as string,
  {
    dialect: "mysql",
    host: "localhost", // hosting
    logging: false,
  },
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection success!");
  })
  .catch((error) => {
    console.error("Connection error!");
  });

export default sequelize;
