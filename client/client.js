const prompt = require("prompt-sync")();

const command = prompt("Please give me a command, u would like to do!");

switch (command) {
	case "read-todos":
		fetch("http://localhost:8000/todos")
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
			});
		break;
	case "create":
		break;
	case "update":
		break;
	case "delete":
		id = prompt("Please give the ID of the todo u would like to delete!");
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
			console.log("error");
		}
		break;
	default:
		throw new Error(`There isnt a ${command} type of command!`);
}

console.log(hi);
console.log(typeof hi);
