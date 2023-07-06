import getConnection from "../db/connect.js";
const connection = getConnection();

//!3ER ENDPOINT, DONDE SE SUMAN LAS CANTIDADES DE PRODUCTO EN TODAS LAS BODEGAS
const listaProductos = (req, res) => {
  connection.query(
    /*mysql*/ `
    SELECT id_producto, SUM(cantidad) AS Total
    FROM inventarios
    GROUP BY id_producto
    ORDER BY Total DESC
    `,
    (err, data, fil) => {
      if (err) {
        res.send(err);
      } else {
        res.json(data);
      }
    }
  );
};

export const methodsHTTP = {
  listaProductos: listaProductos,
};
