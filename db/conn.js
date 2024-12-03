const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("tasks", "tasks-user", "tasksUser!1995", {
  host: "localhost",
  dialect: "mysql",
});

try {
    sequelize.authenticate();
    console.log("connection established");
} catch (err) {
    console.log("connection error: " + err);
}

module.exports = sequelize;
