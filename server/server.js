import express from "express";
import fs from "fs";

const port = 8000;

const app = express();

app.use(express.json());

app.get("/todos", (req, res) => {
	const todos = fs.readFileSync("../todos.json", "utf-8");

	if (todos.length == 0) {
		res.json({ message: "You dont have any todos yet!" });
	} else {
		const parsedTodos = JSON.parse(todos);
		res.status(200).json(parsedTodos);
	}
});

app.post("/todos", (req, res) => {
	if (req.body == {}) {
		res.status(404).json({ message: "You have to give a new Todo!" });
	}

	const { title } = req.body;
	const todos = fs.readFileSync("../todos.json", "utf-8");
	if (todos.length == 0) {
		res.json({ message: "You dont have any todos yet!" });
	} else {
		const parsedTodos = JSON.parse(todos);
		const newTodo = {
			id: parsedTodos[parsedTodos.length - 1].id + 1,
			title,
			isCompleted: false,
		};
		const newTodoList = [...parsedTodos, newTodo];
		fs.writeFileSync("../todos.json", JSON.stringify(newTodoList));

		res.status(200).json(newTodo);
	}
});

app.put("/updatetitle/:id", (req, res) => {
	const { id } = req.params
	const {title} = req.body
	const todos = fs.readFileSync("../todos.json", "utf-8");
	if (todos.length == 0) {
		return res.json({ message: "You dont have any todos yet!" });
	} 
	const parsedTodos = JSON.parse(todos);
	const todo = parsedTodos.find((t) => t.id == id)
	if (todo) {
		const newTodoList = parsedTodos.map((todo) => {
			if (todo.id === Number(id)) {
				todo.title = title
			}
			return todo
		})
		fs.writeFileSync('../todos.json', JSON.stringify(newTodoList))
		return res.status(200).json(newTodoList)
	} else {
		return res.status(404).send({message: "Not found"})
	}
})


app.put("/updatestatus/:id", (req, res) => {
	if (req.body.length == 0) {
		return res.status(400).json({
			message:
				"You have to write 'done' or 'undone'! ",
		});
	}
	const { id } = req.params;
	const { status } = req.body;
	const todos = fs.readFileSync("../todos.json", "utf-8");
	if (todos.length == 0) {
		return res.status(404).send({ message: "You dont have any todos yet!" });
	}
	const parsedTodos = JSON.parse(todos);
	const todo = parsedTodos.filter((t) => t.id === id);
	if (todo) {
		const newTodoList = parsedTodos.map((todo) => {
			if (todo.id === Number(id)) {
				if (status === "done") {
					todo.isCompleted = true
				}
				if (status === "undone") {
					todo.isCompleted = false
				}
			}
			return todo
		})
		fs.writeFileSync('../todos.json', JSON.stringify(newTodoList))
		return res.status(200).json(newTodoList)
	} else {
		return res.status(404).send({message: "Not found"})
	}
});

app.delete("/todos/:id", (req, res) => {
	const { id } = req.params;
	if (isNaN(id)) {
		return res.status(400).json({ message: "ID must be a number!" });
	}
	const todos = fs.readFileSync("../todos.json", "utf-8");
	if (todos.length == 0) {
		return res.status(400).json({ message: "You dont have any todos yet!" });
	}
	const parsedTodos = JSON.parse(todos);
	if (parsedTodos.find((t) => t.id == id)) {
		const newTodoList = parsedTodos.filter((t) => t.id != id);
		fs.writeFileSync("../todos.json", JSON.stringify(newTodoList));
		return res
			.status(201)
			.json({ message: "Your todo has been deleted.", result: newTodoList });
	} else {
		return res.status(400).json({ message: "No todo with this ID" });
	}
});

app.listen(port, () => {
	console.log(`Server is listening on port: ${port}`);
});
