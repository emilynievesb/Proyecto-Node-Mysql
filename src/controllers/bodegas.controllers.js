import getConnection from "../db/connect.js";
const connection = getConnection();

//FUNCIÓN QUE EJECUTA LOS QUERYS
const sqlQuery = (sql) => {
  return new Promise((resolve, reject) => {
    connection.query(sql, (err, data, fil) => {
      if (err) {
        reject({ status: "error", error: err });
        console.log(err);
      } else {
        resolve({ status: "sucess", data: data });
        console.log(data);
      }
    });
  });
};
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
    id,
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
    const query = /*sql */ `
    INSERT INTO bodegas (
    id,
    nombre,
    id_responsable,
    estado,
    created_by,
    update_by,
    created_at,
    updated_at,
    deleted_at
    ) VALUES (${id},'${nombre}',${id_responsable},${estado},${created_by},${update_by},'${created_at}','${updated_at}','${deleted_at}')
    `;
    // console.log(sqlQuery(query));
    const result = await sqlQuery(query);
    res.send(result);
  } catch (error) {
    res.send(error);
  }
};
export const methodsHTTP = {
  listaBodegas: listaBodegas,
  agregarBodegas: crearBodegas,
};
