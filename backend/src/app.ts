import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import ussdRoutes from "./routes/ussd.routes.js";
import mpesaRoutes from "./routes/mpesa.routes.js";
import airtelRoutes from "./routes/airtel.routes.js";

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
app.use("/api/ussd", ussdRoutes);
app.use("/api/mpesa", mpesaRoutes);
app.use("/api/airtel", airtelRoutes);

export default app;
