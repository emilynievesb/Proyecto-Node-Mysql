import { Router } from "express";
import { methodsHTTP as productosController } from "../controllers/productos.controllers.js";

const router = Router();

//? 7. ENDPOINT PARA AGREGAR UN NUEVO PRODUCTO Y UN INVENTARIO EN UNA BODEGA POR DEFAULT
router.post("/nuevoProducto", productosController.agregarProducto);

export default router;
