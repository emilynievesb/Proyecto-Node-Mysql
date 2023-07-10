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

export const methodsHTTP = {
  listaProductos: listaProductos,
};
