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
		res.json(parsedTodos);
	}
});

app.post("/todos", () => {});

const todos = fs.readFileSync("../todos.json", "utf-8");

console.log(typeof todos);
app.listen(port, () => {
	console.log(`Server is listening on port: ${port}`);
});
