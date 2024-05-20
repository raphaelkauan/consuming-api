const express = require("express");
const app = express();
const port = 3000;

app.listen(port, () => {
    console.log("Servidor online!");
});

const routes = require("./routes/routes.js");

app.use("/api", routes);
