import { Router } from "express";
import { methodsHTTP as bodegasController } from "../controllers/bodegas.controllers.js";
import { addBodegaValidator } from "../utils/validator.js";

const router = Router();

//? 4. ENDPOINT QUE LISTA BODEGAS EN ORDEN ALFABÉTICO
router.get("/listaBodegas", bodegasController.listaBodegas);
//? 5. ENDPOINT QUE CREA BODEGAS
router.post(
  "/agregarBodega",
  addBodegaValidator,
  bodegasController.agregarBodegas
);

export default router;
