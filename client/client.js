import { GetTodos, CreateTodo, DeleteTodo } from "./CrudFunctions.js";
import promptFunction from "prompt-sync";
// const prompt = require("prompt-sync")();
const prompt = promptFunction();

const command = prompt("Give a command, u would like to do! ");

switch (command) {
	case "read-all-todos":
		GetTodos().then((todos) => console.log(todos));
		// fetch("http://localhost:8000/todos")
		// 	.then((response) => response.json())
		// 	.then((data) => {
		// 		console.log(data);
		// 	});
		break;
	case "read-filtered-todos":
		const filter = prompt(
			"Which todos do u want to get (completed or not-completed)? "
		);
		const re = /(^not.completed|notcompleted|completed)/i;

		if (!re.test(filter)) {
			console.log(filter);
			throw new Error("The filter must be either completed or not-completed");
		}

		GetTodos().then((todos) => {
			let filteredTodos = [];
			if (filter == "completed") {
				filteredTodos = todos.filter((todo) => todo.isCompleted == true);
			} else {
				filteredTodos = todos.filter((todo) => todo.isCompleted == false);
			}
			console.log(`The ${filter} todos:`);
			console.log(filteredTodos);
		});
		// fetch(`http://localhost:8000/todos/`)
		// .then((response) => response.json())
		// .then((data) => {
		// 	console.log(data);
		// });
		// fetch(`http://localhost:8000/todos/${filter}`)
		// 	.then((response) => response.json())
		// 	.then((data) => {
		// 		console.log(data);
		// 	});

		break;
	case "create":
		const givenTitle = prompt("Give a Todo title! ");

		if (givenTitle.length == 0) {
			throw new Error("U must give a title!");
		}
		CreateTodo(givenTitle);
		// fetch(`http://localhost:8000/todos/`, {
		// 	method: "POST",
		// 	headers: { "Content-Type": "application/json" },
		// 	body: JSON.stringify({
		// 		title: givenTitle,
		// 	}),
		// })
		// .then((response) => response.json())
		// .then((data) => console.log(data));
		break;
	case "update-todo-title":
		break;
	case "update-todo-status":
		break;
	case "delete":
		const id = prompt("Give the ID of the todo u would like to delete! ");
		if (id.length != 0) {
			DeleteTodo(id);
			// fetch(`http://localhost:8000/todos/${id}`, {
			// 	method: "DELETE",
			// 	headers: { "Content-Type": "application/json" },
			// })
			// 	.then((response) => response.json())
			// 	.then((data) => {
			// 		console.log(data);
			// 	});
		} else {
			console.log("U must give an ID!");
		}
		break;
	default:
		throw new Error(`There isnt a ${command} type of command!`);
}
