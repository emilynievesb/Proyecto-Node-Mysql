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

//!4TO ENDPOINT, DONDE SE AGREGAN PRODUCTOS Y UN INVENTARIO POR DEFAULT
const agregarProducto = async (req, res) => {
  const {
    id,
    nombre,
    descripcion,
    estado,
    created_by,
    update_by,
    created_at,
    updated_at,
    deleted_at,
  } = req.body;
  try {
    const queryProducto = /*sql*/ `
        INSERT INTO productos (
            nombre,
            descripcion,
            estado,
            created_by,
            update_by,
            created_at,
            updated_at,
            deleted_at
        ) VALUES (\"${nombre}\",\"${descripcion}\",${estado},${created_by},${update_by},\"${created_at}\",\"${updated_at}\",\"${deleted_at}\");
        `;
    const result = await sqlQuery(queryProducto);
    if (result.status === "sucess") {
      const queryID = /*sql*/ `
            SELECT LAST_INSERT_ID() AS producto_id
        `;
      const resultID = await sqlQuery(queryID);
      const { producto_id } = resultID.data[0];
      const queryInventario = /*sql */ `
      INSERT INTO inventarios (
          id_bodega,
          id_producto,
          cantidad,
          created_by,
          update_by,
          created_at,
          updated_at,
          deleted_at
          ) VALUES (11,${producto_id},100,${created_by},${update_by},\"${created_at}\",\"${updated_at}\",\"${deleted_at}\");
      `;
      const resultTotal = await sqlQuery(queryInventario);
      res.send(resultTotal);
    } else {
      res.send(result);
    }
  } catch (error) {
    res.send(error);
    console.log(error);
  }
};

export const methodsHTTP = {
  agregarProducto: agregarProducto,
};
