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
        if(search(task.name)){
            res.json(400,{message: "Alredy has this task name registerd"})
        }else{await Task.create(task)
            .then(() => {
                res.json(200,task)
            })
            .catch(err => console.log(err))
        }
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
        if(search(newTask.name)){
            res.json(400,{message: "Alredy has this task name registerd"})
        }else{
            try{
                await Task.update(newTask, {where: { id: idTask }})
                res.json(200, { message: "sucess" });
            }catch(error){
                console.log(error)
            }
        }
    }
}

async function search(name) {
    const verificationName = await Task.findOne({where: {name: name}})
    if (verificationName){
        return true
    }else{
        return false
    }
}