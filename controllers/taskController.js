const { Sequelize, or} = require("sequelize");
const Task = require('../models/Task');
//
module.exports = class TaskController{
    static async returnTasks(req, res){
        const tasks = await Task.findAll();
        res.json(tasks);
    }

    static async createTask(req,res){
        let task = {
            name: req.body.name,
            cost: req.body.cost,
            data_limit: req.body.data_limit,
            order: req.body.order,
        }
        console.log(task)
        await Task.create(task)
        .then(() => {
            res.json(task)
        })
        .catch(err => console.log(err))
    }

    static async deleteTask(req, res) {
        const idTask = req.params.id

        try {
            await Task.destroy({where: {id: idTask}})
            res.json(200, { message: "sucess" });
        }catch(error){
            console.log(error)
        }

    }
}