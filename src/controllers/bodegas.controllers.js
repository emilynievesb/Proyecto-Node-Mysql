import getConnection from "../db/connect.js";
const connection = getConnection();

//!1ER ENDPOINT, DONDE SE ORDENAN ALFABETICAMENTE LAS BODEGAS
const listaBodegas = (req, res) => {
  connection.query(
    /*mysql*/ `
    SELECT * FROM bodegas ORDER BY nombre
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
  listaBodegas: listaBodegas,
};
