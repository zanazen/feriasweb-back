import express from "express";
import * as dotenv from "dotenv";
import dbConnect from "./config/db.config.js";
import userRouter from "./routes/user.routes.js";
import feriasRouter from "./routes/ferias.routes.js";
import departamentoRouter from "./routes/departamento.routes.js";
import cors from "cors";

dotenv.config();

dbConnect();

const app = express();

app.use(cors({ origin: process.env.REACT_URL }));
app.use(express.json());

app.use("/user", userRouter);
app.use("/ferias", feriasRouter);
app.use("/departamento", departamentoRouter);

app.listen(Number(process.env.PORT), () =>
  console.log(`server on port ${process.env.PORT}!`)
);