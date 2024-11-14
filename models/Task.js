const { DataTypes } = require ("sequelize")
const db = require ("../db/conn")

const Task = db.define('Task',{
    name:{ 
        type: DataTypes.STRING,
        require: true,
    },
    cost:{ 
        type: DataTypes.FLOAT,
        require: true,
    },
    data_limit: { 
        type: DataTypes.DATE,
        require: true,
    },
    order: { 
        type: DataTypes.INTEGER,
    }
})
module.exports = Task