const { Sequelize, or} = require("sequelize");
const Task = require('../models/Task');
const { SELECT } = require("sequelize/lib/query-types");
const conn = require("../db/conn")
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
            order_task: await Task.count()
        }
        
        //console.log(task)
        const validation = await search(task.name)
        if(validation){
            res.json(400,{message: "Alredy has this task name registerd"})
        }else{await Task.create(task)
            .then(() => {
                //task.order_task = req.body.id;
                
                //console.log(task.order_task);
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
        console.log("aqui", newTask.name);
        const validation = await search(newTask.name);
        //console.log(idTask.name, validation)
        if(validation){
            res.json(400,{message: "Alredy has this task name registerd"})
        }else{
            try{
                //console.log(idTask, newTask);
                await Task.update(newTask, {where: { id: idTask}})
                res.json(200, { message: "sucess" });
            }catch(error){
                console.log(error)
            }
        }
    }

    static async updateOrder(req,res){
        const idTask = req.params.id
        const newOrder = req.body.order_task;
        const maxOrder = await Task.count()

        if(newOrder > maxOrder){
            res.json(400, { message: "New order greater than maximum" });
        }else{
            try{
                /*const queryOldOrder =
                `SELECT order_task, id FROM tasks`;
                const resultOld = await conn.query(queryOldOrder, (err, result) => {
                    if (err) {
                        console.log(err)
                        return
                    }
                    
                })
                console.log("AQUI",resultOld)*/
                
                for (let i = 0; i < maxOrder; i++) {
                    const query = `UPDATE tasks SET order_task = ${newOrder[i]} WHERE id = ${i+1}`
                    conn.query(query, (err, result) => {
                        if (err) {
                        console.log(err);
                        return;
                        }
                    }); 

                }
                
                res.json(200, { message: "sucess" });
            }catch(error){
                console.log(error)
            }

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