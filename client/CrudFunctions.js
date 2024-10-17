export function GetTodos() {
	return fetch("http://localhost:8000/todos")
		.then((response) => {
			return response.json();
		})
		.then((data) => {
			return data;
		});
}

export function CreateTodo(title) {
	fetch(`http://localhost:8000/todos/`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			title: title,
		}),
	})
		.then((response) => response.json())
		.then((data) => {
			console.log(data);
		});
}

export function DeleteTodo(id) {
	fetch(`http://localhost:8000/todos/${id}`, {
		method: "DELETE",
		headers: { "Content-Type": "application/json" },
	})
		.then((response) => response.json())
		.then((data) => {
			console.log(data);
		});
}

export function updateTitle(id, title) {
	return fetch(`http://localhost:8000/updatetitle/${id}`, {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ title: title })
	})
		.then((response) => {
			return response.json();
		})
		.then((data) => {
			return data;
		});
}

export function updateStatus(id, status) {
	return fetch(`http://localhost:8000/updatestatus/${id}`, {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ status: status })
	})
		.then((response) => {
			return response.json();
		})
		.then((data) => {
			return data;
		});
}