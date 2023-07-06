import { Router } from "express";
import { methodsHTTP as inventariosController } from "../controllers/inventarios.controllers.js";

const router = Router();

//? 6. ENDPOINT QUE LISTA PRODUCTOS EN ORDEN DESCENDENTE SEGUN LA CANTIDAD TOTAL
router.get("/cantProductos", inventariosController.listaProductos);

export default router;
