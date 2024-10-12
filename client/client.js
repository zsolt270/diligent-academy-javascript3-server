const prompt = require('prompt-sync')();

const hi = prompt("Hi! Let's see your todos! Press Enter!")

fetch('http://localhost:8000/todos')
  .then(response => response.json())
  .then(data => {
    console.log(data)
  })