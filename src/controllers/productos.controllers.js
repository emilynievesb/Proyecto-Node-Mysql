import { lastId, postProduct, postReqInv, sqlQuery } from "../utils/utils.js";

//!4TO ENDPOINT, DONDE SE AGREGAN PRODUCTOS Y UN INVENTARIO POR DEFAULT
const agregarProducto = async (req, res) => {
  const {
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
    const queryProducto = postProduct(
      nombre,
      descripcion,
      estado,
      created_by,
      update_by,
      created_at,
      updated_at,
      deleted_at
    );
    const result = await sqlQuery(queryProducto);
    if (result.status !== "sucess") {
      throw new Error(`Error al agregar el nuevo producto`);
    }
    const queryID = lastId();
    const resultID = await sqlQuery(queryID);
    const [dataID] = resultID.data;
    const { id: id_producto } = dataID;
    const queryInventario = postReqInv(
      11,
      id_producto,
      100,
      created_by,
      update_by,
      created_at,
      updated_at,
      deleted_at
    );
    const resultTotal = await sqlQuery(queryInventario);
    if (resultTotal.status !== "sucess") {
      throw new Error(`Error al publicar un inventario por default`);
    }
    res.send(`Producto creado con su respectivo inventario`);
  } catch (error) {
    res.send(error.message);
  }
};

export const methodsHTTP = {
  agregarProducto: agregarProducto,
};
