const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const con = require("./config/database/connection");

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

const handleDbConnection = () => {
    con.connect((err) => {
        if (err) {
            console.error("Error connecting to the database:", err);
            process.exit(1);
        } else {
            console.log("Connected to the MySQL database");
        }
    });

    con.on("error", (err) => {
        console.error("Database error:", err);
        if (err.code === "PROTOCOL_CONNECTION_LOST") {
            console.log("Attempting to reconnect...");
            handleDbConnection();
        }
    });
};


handleDbConnection();

const userRoute = require("./router/user/userRoutes");
app.use("/user", userRoute);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
