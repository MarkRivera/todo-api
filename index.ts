import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors({
    origin: "http://localhost:5173"
}));
const todos: Array<{ title: string, checked: boolean }> = [];
app.post('/api/todo/create', (req, res) => {
    const { title, checked } = req.body;
    todos.push({ title, checked });

    res.send({ status: 200, message: 'Todo created successfully' });
});

app.get('/api/todo/read', (req, res) => {
    res.json({ status: 200, data: todos });
});

app.delete('/api/todo/delete', (req, res) => {
    const { title } = req.body;
    const index = todos.findIndex(todo => todo.title === title);
    todos.splice(index, 1);

    res.send({ status: 200, message: 'Todo deleted successfully', data: todos });
});

app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});