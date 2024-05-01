import express from "express";
import cors from "cors";
import crypto from "crypto";

type Todo = {
  id: crypto.UUID;
  title: string;
  checked: boolean;
};

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());

let todos: Array<Todo> = [
  { id: crypto.randomUUID(), title: "Learn React", checked: false },
  { id: crypto.randomUUID(), title: "Learn Node.js", checked: false },
  { id: crypto.randomUUID(), title: "Learn TypeScript", checked: false },
];
app.post("/api/todo/create", (req, res) => {
  const { title, checked }: Todo = req.body;
  const newTodo: Todo = { id: crypto.randomUUID(), title, checked };
  todos.push(newTodo);

  res.json({ status: 200, message: "Todo created successfully", data: todos });
});

app.get("/api/todo/read", (req, res) => {
  res.json({ status: 200, data: todos });
});

app.get("/api/todo/read/:id", (req, res) => {
  const { id } = req.params;
  const todo = todos.find((todo) => todo.id === id);
  if (!todo) return res.json({ status: 404, message: "Todo not found" });

  res.json({ status: 200, data: todo });
});

app.patch("/api/todo/update", (req, res) => {
  const { id, ...updates }: Partial<Todo> = req.body;
  const index = todos.findIndex((todo) => todo.id === id);
  if (index === -1) return res.json({ status: 404, message: "Todo not found" });

  todos[index] = { ...todos[index], ...updates };
  res.json({ status: 200, message: "Todo updated successfully", data: todos });
});

app.delete("/api/todo/delete", (req, res) => {
  const { id } = req.body;
  const index = todos.findIndex((todo) => todo.id === id);
  if (index === -1) return res.json({ status: 404, message: "Todo not found" });

  todos.splice(index, 1);
  res.json({ status: 200, message: "Todo deleted successfully", data: todos });
});

app.delete("/api/todo/delete", (req, res) => {
  const { id } = req.body;
  const index = todos.findIndex((todo) => todo.id === id);
  if (index === -1) return res.json({ status: 404, message: "Todo not found" });

  todos.splice(index, 1);
  res.json({ status: 200, message: "Todo deleted successfully", data: todos });
});

app.delete("/api/todo/deleteAllCompleted", (req, res) => {
  const todo = todos.filter((todo) => !todo.checked);
  todos = todo;
  res.json({ status: 200, message: "Todo deleted successfully", data: todos });
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
