const { Sequelize, or} = require("sequelize");
const Task = require('../models/Task');
//
module.exports = class TaskController{
    static async getTasks(req, res){
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

    static async updateTask(req, res) {
        const idTask = req.params.id
        const newTask = {
            name: req.body.name,
            cost: req.body.cost,
            data_limit: req.body.data_limit,
        }
        try{
            await Task.update(newTask, {where: { id: idTask }})
            res.json(200, { message: "sucess" });
        }catch(error){
            console.log(error)
        }
    }
}