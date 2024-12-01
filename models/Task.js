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
    dateLimit: { 
        type: DataTypes.DATE,
        require: true,
        field: 'date_limit'
    } ,
    orderTask: { 
        type: DataTypes.INTEGER,
        field: 'order_task'
        
    }
})
module.exports = Task