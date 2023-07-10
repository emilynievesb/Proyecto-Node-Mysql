import express from "express";
import inventariosRoutes from "./routes/inventarios.routes.js";
import bodegasRoutes from "./routes/bodegas.routes.js";

const app = express();
app.use(express.json()); //! Middleaware para leer json
app.use("/inventario", inventariosRoutes);
app.use("/bodega", bodegasRoutes);

export default app;
