import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from 'dotenv';
import routes from "./routes/index.route.js";
const app = express();

dotenv.config();
dotenv.config({ path : './utilities/regex.env' })

mongoose.connect(process.env.DB_connection_string, 
    {
        autoIndex: true,
    }
)

app.use(express.json());
app.use(cors());

app.use("/api", routes);

const port = process.env.PORT;
app.listen(port, () => {
    console.log("Server running on port "+port);
})