//? dependencias
const express = require("express");

//? Archivos de rutas.
const userRouter = require("./users/users.route").router;
const authRouter = require("./auth/auth.router").router;
const postRouter = require("./posts/posts.router").router;

const app = express();

app.use(express.json());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/posts", postRouter);

require("dotenv").config();
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
