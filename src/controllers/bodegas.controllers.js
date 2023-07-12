import { sqlQuery, postBodegas } from "../utils/utils.js";

//!1ER ENDPOINT, DONDE SE ORDENAN ALFABETICAMENTE LAS BODEGAS
const listaBodegas = async (req, res) => {
  try {
    const query = /*sql*/ `
        SELECT * FROM bodegas ORDER BY nombre
        `;
    const result = await sqlQuery(query);
    res.send(result);
  } catch (error) {
    res.send(error);
  }
};
//!2DO ENDPOINT, DONDE SE CREAN LAS BODEGAS
const crearBodegas = async (req, res) => {
  const {
    nombre,
    id_responsable,
    estado,
    created_by,
    update_by,
    created_at,
    updated_at,
    deleted_at,
  } = req.body;
  try {
    const query = postBodegas(
      nombre,
      id_responsable,
      estado,
      created_by,
      update_by,
      created_at,
      updated_at,
      deleted_at
    );
    const result = await sqlQuery(query);
    res.send("Bodega creada correctamente");
  } catch (error) {
    res.send(error);
  }
};
export const methodsHTTP = {
  listaBodegas: listaBodegas,
  agregarBodegas: crearBodegas,
};
