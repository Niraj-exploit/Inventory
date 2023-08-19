const Sequelize = require("sequelize");

const sequelize = new Sequelize("project", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

// const sequelize = new Sequelize('your database name', 'your postgres username', 'your postgres password',{
//     host: 'localhost',
//     dialect: 'postgres'
// })

module.exports = sequelize;
