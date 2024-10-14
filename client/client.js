const prompt = require("prompt-sync")();

const command = prompt("Give me a command, u would like to do! ");

switch (command) {
	case "read-todos":
		fetch("http://localhost:8000/todos")
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
	case "update":
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
