const express = require("express");
// const router = require("./router");
const fs = require("fs");

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

app.put('/todos/:id', (req, res) => {
	if (req.body.length == 0) {
		return res.status(400).json({ message: "You have to give a modified todo or write 'complete', if you completed a todo!" });
	};
	const { id } = req.params;
	const todos = fs.readFileSync('../todos.json', 'utf-8');
	if (todos.length == 0) {
		return res.json({ message: "You dont have any todos yet!" });
	};
	const parsedTodos = JSON.parse(todos);
	const todo = parsedTodos.filter( t => t.id === id);

	const { userInput } = req.body;
	console.log(userInput);
	// if (userInput === "completed") {

	// }
})

app.delete('../todos/:id', (req, res) => {
	const { id } = req.params;
	const todos = fs.readFileSync('../todos.json', 'utf-8');
	const parsedTodos = JSON.parse(todos);
	const newTodoList = parsedTodos.filter( t => t.id != id)
	fs.writeFileSync('../todos.json', JSON.stringify(newTodoList))
	return res.json({message: "Your todo has been deleted."})
})

app.listen(port, () => {
	console.log(`Server is listening on port: ${port}`);
});
