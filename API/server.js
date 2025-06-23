const express = require('express');
const router = express.Router();
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

const tasks = [];

const getTasks = router.get('/tasks', (req, res) => {
  res.status(200).json(tasks);
});

const getTaskId = router.get('/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id); 
    const task = tasks.find((t) => t.id === id);

    if (!task) {
        return res.status(404).json({message: "Tarefa não encontrada!" });
    }

    res.status(200).json(task);
});

const createTask = router.post('/tasks', (req, res) => {
  const task = {
    id: req.body.id,
    title: req.body.title,
    description: req.body.description
  };

  tasks.push(task);

  res.status(201).json({message: "Tarefa criada com sucesso!", task});
});

const updateTask = router.put('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const taskIndex = tasks.findIndex((t) => t.id === id);

  if (taskIndex === -1) {
    return res.status(404).json({ message: "Tarefa não encontrada!" });
  }

  tasks[taskIndex].title = req.body.title;
  tasks[taskIndex].description = req.body.description;

  res.status(200).json({ message: "Tarefa atualizada com sucesso!", task: tasks[taskIndex] });
});

const deleteTask = router.delete('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const taskIndex = tasks.findIndex((t) => t.id === id);

  if (taskIndex === -1) {
    return res.status(404).json({ message: "Tarefa não encontrada!" });
  }

  tasks.splice(taskIndex, 1);

  res.status(200).json({ message: "Tarefa deletada com sucesso!" });
});

app.use(getTasks);
app.use(getTaskId);
app.use(createTask);
app.use(updateTask);
app.use(deleteTask);

app.listen(3000, () => {
    console.log("Servidor de tarefa rodando com sucesso! http://localhost:3000");
});