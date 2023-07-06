import { Router } from "express";
import { methodsHTTP as bodegasController } from "../controllers/bodegas.controllers.js";

const router = Router();

//? 4. ENDPOINT QUE LISTA BODEGAS EN ORDEN ALFABÉTICO
router.get("/listaBodegas", bodegasController.listaBodegas);

export default router;
