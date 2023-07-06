import express from "express";
import inventariosRoutes from "./routes/inventarios.routes.js";

const app = express();

app.use("/inventario", inventariosRoutes);

export default app;
