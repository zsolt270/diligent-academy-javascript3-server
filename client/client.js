import { GetTodos, CreateTodo, DeleteTodo, updateTitle, updateStatus } from "./CrudFunctions.js";
import promptFunction from "prompt-sync";

const prompt = promptFunction();

const command = prompt("Choose from this command list: read-all, filter, create, update-title, update-status, delete! ");

switch (command) {
	case "read-all":
		GetTodos().then((todos) => console.log(todos));
		break;
	case "filter":
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
		break;
	case "create":
		const givenTitle = prompt("Give a Todo title! ");
		if (givenTitle.length == 0) {
			throw new Error("U must give a title!");
		}
		CreateTodo(givenTitle);
		break;
	case "update-title":
    const updateId = prompt("Give the ID of todo, you would like to update! ")
    const title = prompt("Give the new title ")
    updateTitle(updateId, title).then((data) => console.log(data));
		break;
    case "update-status":
    const updateStatusId = prompt("Give the ID of todo, you would like to update! ")
    const status = prompt("If you completed your todo, write: done. If your todo is not complete, write: undone. ")
    if ( status != "done" && status != "undone") {
      console.log("You have to write 'done' or 'undone' ");
    } else {
      updateStatus(updateStatusId, status).then((data) => console.log(data));
    }
    break;
	case "delete":
		const id = prompt("Give the ID of the todo u would like to delete! ");
		if (id.length != 0) {
			DeleteTodo(id);
		} else {
			console.log("U must give an ID!");
		}
		break;
	default:
		throw new Error(`There isnt a ${command} type of command!`);
}
