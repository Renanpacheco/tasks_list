const { Sequelize, or} = require("sequelize");
const Task = require('../models/Task');
const { SELECT } = require("sequelize/lib/query-types");
const conn = require("../db/conn")
const yup = require('yup');


const taskValidation = yup.object().shape({
    name: yup.string("Erro: Necessário preencher esse campo nome com texto").required("Erro: Necessário preencher esse campo nome"),
    cost: yup.number("Erro: Necessário preencher esse campo custo com um numero").required("Erro: Necessário preencher esse campo custo com um numero").positive("Erro: Necessário preencher esse campo custo com um numero positivo"),
    date_limit: yup.date("Erro: Necessário preencher esse campo custo com uma data no formato yyyy-mm-dd").required("Erro: Necessário preencher esse campo custo com uma data no formato yyyy-mm-dd"),
})

module.exports = class TaskController{
    

    static async getTasks(req, res){
        const tasks = await Task.findAll();
        res.json(tasks);
    }

    static async createTask(req,res){
        
        /*if (!(await taskValidation.isValid(req.body))) {
            return res.status(400).json({
                erro: true, 
                message: "erro: por favor preencha todos os campos na forma de  nome: nome da tarefa, custo : 00.00 e data: aaaa/mm/dd"})
        }*/
        try {
            await taskValidation.validate(req.body);
        } catch (err) {
            return res.status(400).json({
                erro: true,
                message: err.errors
            })
        }
        
        const validationNameIsNumber = validateEntryName(req.body.name)
        const validationName = await search(req.body.name)
        if(validationName){
            res.json(400,{message: "Alredy has this task name registerd"})
        }else if(validationNameIsNumber){

        }else{
            await Task.create(task)
            .then(() => {
                res.json(200,task)
            })
            .catch(err => console.log(err))
        }
        
        let task = {
            name: req.body.name,
            cost: req.body.cost,
            date_limit: req.body.date_limit,
            order_task: await Task.count()
        }
        
        /*const validationName = await search(task.name)
        if(validationName){
            res.json(400,{message: "Alredy has this task name registerd"})
        }else{await Task.create(task)
            .then(() => {
                res.json(200,task)
            })
            .catch(err => console.log(err))
        }*/
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
            date_limit: req.body.date_limit,
        }
        console.log("aqui", newTask.name);
        const validation = await search(newTask.name);
        if(validation){
            res.json(400,{message: "Alredy has this task name registerd"})
        }else{
            try{
                await Task.update(newTask, {where: { id: idTask}})
                res.json(200, { message: "sucess" });
            }catch(error){
                console.log(error)
            }
        }
    }

    static async updateOrder(req,res){
        const newOrder = req.body.order_task;
        const maxOrder = await Task.count()

        if(newOrder > maxOrder){
            res.json(400, { message: "New order greater than maximum" });
        }else{
            try{
                
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
    const verificationName = await Task.findOne({where: {name: isName}})
    if (verificationName !== null) {
        return true
    }else{
        return false
    }
}

function validateEntryName(entryName){
    
    const verificationName = function(entryName) { return /^\d+(?:\. \d+)? $/. test(entryName); }
    if (verificationName){
            return true
    }else{
        return false

    }

}