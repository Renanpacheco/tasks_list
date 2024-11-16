const { Sequelize, or} = require("sequelize");
const Task = require('../models/Task');
const { SELECT } = require("sequelize/lib/query-types");
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
            order: await Task.count()
        }
        
        console.log(task)
        const validation = await search(task.name)
        if(validation){
            res.json(400,{message: "Alredy has this task name registerd"})
        }else{await Task.create(task)
            .then(() => {
                //task.order = req.body.id;
                
                console.log(task.order);
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
        const validation = await search(idTask.name);
        if(validation){
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

    static async updateOrder(req,res){
        const idTask = req.params.id
        const newOrder= req.body.order
        
        const maxOrder = await Task.max(order)
        console.log(maxOrder)

        if(newOrder > maxOrder){
            res.json(400, { message: "New order greater than maximum" });
        }else{
            await Task.update(newOrder, { where: { order: idTask } });
            /*or (var i = newOrder; i < maxOrder; i++){
                Task.
            }*/

        }
        
    }

    
}

async function search(isName) {
    console.log(isName)
    const verificationName = await Task.findOne({where: {name: isName}})
    console.log(verificationName)
    if (verificationName !== null) {
        return true
    }else{
        return false
    }
}