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
        require: false,
    },
    cost:{ 
        type: DataTypes.FLOAT,
        require: false,
    },
    data_limit: { 
        type: DataTypes.DATE,
        require: false,
    } ,
    order_task: { 
        type: DataTypes.INTEGER,
        
    }
})
module.exports = Task