const express = require("express");
const fs = require("fs");

const port = 8000;

const app = express();

app.use(express.json());

app.listen(port, () => {
	console.log(`Server is listening on port: ${port}`);
});
