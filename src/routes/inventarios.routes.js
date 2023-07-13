import { Router } from "express";
import { methodsHTTP as inventariosController } from "../controllers/inventarios.controllers.js";
import {
  addHistoryValidator,
  addInventoryValidator,
} from "../utils/validator.js";

const router = Router();

//? 6. ENDPOINT QUE LISTA PRODUCTOS EN ORDEN DESCENDENTE SEGUN LA CANTIDAD TOTAL
router.get("/cantProductos", inventariosController.listaProductos);
//? 8. ENDPOINT QUE INSERTA O ACTUALIZA REGISTROS DE INVENTARIOS
router.post(
  "/nuevoInventario",
  addInventoryValidator,
  inventariosController.nuevoInventario
);
//? 9. ENDPOINT QUE TRASLADA PRODUCTOS ENTRE BODEGAS
router.post(
  "/traslado",
  addHistoryValidator,
  inventariosController.trasladoProducto
);

export default router;
