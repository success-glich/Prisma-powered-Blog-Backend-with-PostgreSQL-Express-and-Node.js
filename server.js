import dotenv from "dotenv";
import express from "express";

dotenv.config({ path: ".env" })
const app = express();
const PORT = process.env.PORT || 3000;

//* Middleware
app.use(express.json({ limit: "160kb" }))
app.use(express.urlencoded({ extended: true }))
app.get("/", (req, res) => {
    res.send("hello world!");
})

//* Routers file
import routes from "./routes/index.js";
app.use(routes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})