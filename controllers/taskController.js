const { Sequelize, or} = require("sequelize");
const Task = require('../models/Task');
const { SELECT } = require("sequelize/lib/query-types");
const conn = require("../db/conn")
const yup = require('yup');


const taskValidation = yup.object().shape({
    name: yup.string("Erro: Necessário preencher esse campo nome com texto").required("Erro: Necessário preencher esse campo nome"),
    cost: yup.number("Erro: Necessário preencher esse campo custo com um numero").required("Erro: Necessário preencher esse campo custo com um numero").positive("Erro: Necessário preencher esse campo custo com um numero positivo"),
    
})

module.exports = class TaskController {
  static async getTasks(req, res) {
    const tasks = await Task.findAll();
    res.json(tasks);
  }

  static async createTask(req, res) {
    try {
      await taskValidation.validate(req.body);
    } catch (err) {
      return res.status(400).json({
        erro: true,
        message: err.errors,
      });
    }

    const validationName = await search(req.body.name);
    if (validationName) {
      res.json(400, { message: "Alredy has this task name registerd" });
    } else {
      let task = {
        name: req.body.name,
        cost: req.body.cost,
        dateLimit: req.body.dateLimit,
        orderTask: await Task.count(),
      };
      await Task.create(task)
        .then(() => {
          res.json(200, task);
        })
        .catch((err) => console.log(err));
    }
  }

  static async deleteTask(req, res) {
    const idTask = req.params.id;

    try {
      await Task.destroy({ where: { id: idTask } });
      res.json(200, { message: "sucess" });
    } catch (error) {
      console.log(error);
    }
  }

  static async updateTask(req, res) {
    const idTask = req.params.id;

    try {
      await taskValidation.validate(req.body);
    } catch (err) {
      return res.status(400).json({
        erro: true,
        message: err.errors,
      });
    }
    const validation = await search(req.body.name);
    if (validation) {
      res.json(400, { message: "Alredy has this task name registerd" });
    } else {
      const newTask = {
        name: req.body.name,
        cost: req.body.cost,
        dateLimit: req.body.dateLimit,
      };
      try {
        await Task.update(newTask, { where: { id: idTask } });
        res.json(200, { message: "sucess" });
      } catch (error) {
        console.log(error);
      }
    }
  }

  static async updateOrder(req, res) {
    const newOrder = req.body.order_task; // receive the new order od cards (id) 
    const maxOrder = await Task.count(); // Count tasks on database

    
    if (newOrder.length !== maxOrder) {
      return res
        .status(400)
        .json({
          message: "New order differs from the expected number of tasks",
        });
    }

    try {
      
      let caseStatements = newOrder
        .map((taskId, index) => {
          return `WHEN id = ${taskId} THEN ${index + 1}`;
        })
        .join(" ");

      
      const query = `
            UPDATE tasks
            SET order_task = CASE
                ${caseStatements}
                ELSE order_task
            END
            WHERE id IN (${newOrder.join(", ")});
        `;

      
      conn.query(query, (err, result) => {
        if (err) {
          console.log(err);
          return res
            .status(500)
            .json({ message: "Error updating order in the database" });
        }
        res.status(200).json({ message: "Order updated successfully" });
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "An unexpected error occurred" });
    }
  }
};

async function search(isName) {
    const verificationName = await Task.findOne({where: {name: isName}})
    if (verificationName !== null) {
        return true
    }else{
        return false
    }
}