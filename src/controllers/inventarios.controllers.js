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

//!3ER ENDPOINT, DONDE SE SUMAN LAS CANTIDADES DE PRODUCTO EN TODAS LAS BODEGAS
const listaProductos = async (req, res) => {
  try {
    const query = /*sql*/ `
      SELECT id_producto, SUM(cantidad) AS Total
      FROM inventarios
      GROUP BY id_producto
      ORDER BY Total DESC
      `;
    const result = await sqlQuery(query);
    res.send(result);
  } catch (error) {
    res.send(error);
  }
};

//!5TO ENDPOINT, DONDE SE AGREGA O SE ACTUALIZA UN REGISTRO DE INVENTARIO
const nuevoInventario = async (req, res) => {
  const {
    id_bodega,
    id_producto,
    cantidad,
    created_by,
    update_by,
    created_at,
    updated_at,
    deleted_at,
  } = req.body;
  try {
    const queryID = /*sql */ `
    SELECT id FROM inventarios
    WHERE id_bodega = ${id_bodega} AND id_producto = ${id_producto};
    `;
    const resultID = await sqlQuery(queryID);
    let queryInv = "";
    if (resultID.data.length === 1) {
      const { id } = resultID.data[0];
      queryInv = /*sql */ `
      UPDATE inventarios
      SET cantidad = ${cantidad}, created_by = ${created_by},
      update_by = ${update_by}, created_at = \"${created_at}\",
      updated_at = \"${updated_at}\", deleted_at = \"${deleted_at}\"
      WHERE id = ${id};
      `;
    } else {
      queryInv = /*sql */ `
      INSERT INTO inventarios (
        id_bodega,
        id_producto,
        cantidad,
        created_by,
        update_by,
        created_at,
        updated_at,
        deleted_at
      ) VALUES(
        ${id_bodega},${id_producto}, ${cantidad}, ${created_by}, ${update_by}, \"${created_at}\", \"${updated_at}\", \"${deleted_at}\"
      )
      `;
    }
    const result = await sqlQuery(queryInv);
    res.send(result);
  } catch (error) {
    res.send(error);
  }
};

export const methodsHTTP = {
  listaProductos: listaProductos,
  nuevoInventario: nuevoInventario,
};
