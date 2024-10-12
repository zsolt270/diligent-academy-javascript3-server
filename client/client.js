const prompt = require("prompt-sync")();

const command = prompt("Give me a command, u would like to do! ");

switch (command) {
	case "read-all-todos":
		fetch("http://localhost:8000/todos")
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
			});
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

		fetch(`http://localhost:8000/todos/${filter}`)
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
			});

		break;
	case "create":
		const givenTitle = prompt("Give a Todo title! ");

		if (givenTitle.length == 0) {
			throw new Error("U must give a title!");
		}

		fetch(`http://localhost:8000/todos/`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				title: givenTitle,
			}),
		})
			.then((response) => response.json())
			.then((data) => console.log(data));
		break;
	case "update-todo-title":
		break;
	case "update-todo-status":
		break;
	case "delete":
		id = prompt("Give the ID of the todo u would like to delete!");
		if (id.length != 0) {
			fetch(`http://localhost:8000/todos/${id}`, {
				method: "DELETE",
				headers: { "Content-Type": "application/json" },
			})
				.then((response) => response.json())
				.then((data) => {
					console.log(data);
				});
		} else {
			console.log("U must give an ID!");
		}
		break;
	default:
		throw new Error(`There isnt a ${command} type of command!`);
}
