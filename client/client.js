const { response } = require('express');

const prompt = require('prompt-sync')();

const hi = prompt("Hi! Let's see your todos! Press Enter!")
console.log(hi);
console.log(typeof hi);
// fetch('http://localhost:8000/todos')
//   .then(response => response.json())
//   .then(data => {
//     console.log(data)
//   })
if ( hi.length != 0) {
  fetch(`http://localhost:8000/todos/${hi}`, {
    method: "DELETE",
    headers: {"Content-Type" : "application/json"}
  })
   .then(response => response.json())
   .then(data => {
    console.log(data);
   })
} else {
  console.log("error");
}



  // switch (command) {
  //   case "get":
  //     break;
  //   case "put":
  //     break;
  //   default:
  // }