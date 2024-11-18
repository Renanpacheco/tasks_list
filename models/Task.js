const { DataTypes } = require ("sequelize")
const db = require ("../db/conn")

const Task = db.define('Task',{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true

    },
    name:{ 
        type: DataTypes.STRING,
        require: true,
    },
    cost:{ 
        type: DataTypes.FLOAT,
        require: true,
    },
    date_limit: { 
        type: DataTypes.DATE,
        require: true,
    } ,
    order_task: { 
        type: DataTypes.INTEGER,
        
    }
})
module.exports = Task