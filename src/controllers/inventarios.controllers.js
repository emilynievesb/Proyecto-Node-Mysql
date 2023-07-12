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
        console.log(sql, { status: "sucess", data: data });
      }
    });
  });
};
//Función que retorna consultas INSERT INTO
const postReqInv = (
  id_bodega,
  id_producto,
  cantidad,
  created_by,
  update_by,
  created_at,
  updated_at,
  deleted_at
) => {
  let query = /*sql */ `
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
    ${id_bodega},${id_producto}, ${cantidad}, ${created_by},
    ${update_by}, \"${created_at}\", \"${updated_at}\", \"${deleted_at}\"
  )
  `;
  return query;
};

//Función que retorna consultas UPDATE
const updateReqInv = (id, cantidad) => {
  let query = /*sql */ `
  UPDATE inventarios
  SET cantidad = ${cantidad}
  WHERE id = ${id};
  `;
  return query;
};

//Función que retorna consultas select
const searchReq = (id_bodega, id_producto) => {
  let query = /*sql */ `
  SELECT * FROM inventarios
  WHERE id_bodega = ${id_bodega} AND id_producto = ${id_producto};
  `;
  return query;
};

const postReqHistorial = (
  cantidad,
  id_bodega_origen,
  id_bodega_destino,
  id_inventario,
  created_by,
  update_by,
  created_at,
  updated_at,
  deleted_at
) => {
  let query = /*sql*/ `
  INSERT INTO historiales (
    cantidad,
    id_bodega_origen,
    id_bodega_destino,
    id_inventario,
    created_by,
    update_by,
    created_at,
    updated_at,
    deleted_at
  ) VALUES(
    ${cantidad}, ${id_bodega_origen}, ${id_bodega_destino},${id_inventario}, ${created_by},
    ${update_by}, \"${created_at}\", \"${updated_at}\", \"${deleted_at}\"
  )
  `;
  return query;
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
    //Trae la consulta que revisará si hay registros
    const queryID = searchReq(id_bodega, id_producto);
    const resultID = await sqlQuery(queryID);
    let queryInv = "";
    //Validación de si hay un registro existente
    if (resultID.data.length === 1) {
      const [resultIDRegister] = resultID.data;
      const { id, cantidad: cantidad_original } = resultIDRegister;
      queryInv = updateReqInv(
        //Si hay registro, actualiza
        id,
        cantidad_original + cantidad
      );
    } else {
      //No hay registro existente entonces procede a crearlo
      queryInv = postReqInv(
        id_bodega,
        id_producto,
        cantidad,
        created_by,
        update_by,
        created_at,
        updated_at,
        deleted_at
      );
    }
    //ejecuta la consulta
    const result = await sqlQuery(queryInv);
    res.send(result);
  } catch (error) {
    res.send(error);
  }
};

const trasladoProducto = async (req, res) => {
  const {
    id_producto,
    cantidad,
    id_bodega_origen,
    id_bodega_destino,
    created_by,
    update_by,
    created_at,
    updated_at,
    deleted_at,
  } = req.body;
  try {
    //Consulta para revisar la cantidad que hay en el registro existente
    const queryID = searchReq(id_bodega_origen, id_producto);
    //Ejecución
    const resultCant = await sqlQuery(queryID);
    //Validación de si la consulta fue exitosa
    if (resultCant.status !== "sucess") {
      //! El throw hace que se genere una excepción de manera intencional,
      //! Interrumpiendo el flujo del código y buscando un catch para que capturar ese error.
      // throw new Error(`La consulta falló, ${resultCant}`);
      throw new Error(`La consulta falló`);
    }
    if (resultCant.data.length === 0) {
      throw new Error(`No existen resultados de ese producto en esa bodega`);
    }
    //Saco la cantidad que hay en el resultado de la consulta
    const [resultCantRegister] = resultCant.data;
    const { id: id_inventario_origen, cantidad: cantidad_inventario_origen } =
      resultCantRegister;
    //Validación de cantidad suficiente
    if (cantidad_inventario_origen < cantidad) {
      throw new Error(
        "Bad Request, el número a trasladar es mayor al que hay en inventario"
      );
    }
    //Busqueda para validar si hay un registro en la bodega destino para actualizar o en su defecto se actualiza
    const queryBusqueda = searchReq(id_bodega_destino, id_producto);
    const resultInv = await sqlQuery(queryBusqueda);
    if (resultInv.status !== "sucess") {
      throw new Error(
        `Error en la consulta que valida si hay registros en la bodega destino`
      );
    }
    //Si hay algun registro...
    let id_inventario = ""; //variable para almacenar el id del inventario
    if (resultInv.data.length === 1) {
      const [resultInvDestino] = resultInv.data;
      const {
        id: id_inventario_destino,
        cantidad: cantidad_inventario_destino,
      } = resultInvDestino;
      const queryTrasladoDestino = updateReqInv(
        id_inventario_destino,
        cantidad + cantidad_inventario_destino
      );
      const resultTrasladoDestino = await sqlQuery(queryTrasladoDestino);
      if (resultTrasladoDestino.status !== "sucess") {
        throw new Error(
          `Error en la actualización del inventario de la bodega destino`
        );
      }
      id_inventario = id_inventario_destino;
    } else {
      //Sino hay registros, crea uno
      const queryTrasladoDestino = postReqInv(
        id_bodega_destino,
        id_producto,
        cantidad,
        created_by,
        update_by,
        created_at,
        updated_at,
        deleted_at
      );
      const resultTrasladoDestino = await sqlQuery(queryTrasladoDestino);
      if (resultTrasladoDestino.status !== "sucess") {
        throw new Error(
          `La consulta de creación de inventario en la bodega destino falló`
        );
      }
      const queryIdInventario = /*sql*/ `
      SELECT LAST_INSERT_ID() AS id
      `;
      const resultIdInventario = await sqlQuery(queryIdInventario);
      if (resultIdInventario.status !== "sucess") {
        throw new Error(
          `Error en la consulta del id creado anteriormente para crear el traslado`
        );
      }
      const [resultIdInventarioDestino] = resultIdInventario.data;
      const { id } = resultIdInventarioDestino;
      id_inventario = id;
    }
    //Actualiza el inventario de la bodega original
    const queryTrasladoOriginal = updateReqInv(
      id_inventario_origen,
      cantidad_inventario_origen - cantidad
    );
    const resultTrasladoOriginal = await sqlQuery(queryTrasladoOriginal);
    if (resultTrasladoOriginal.status !== "sucess") {
      throw new Error(
        `Error en la actualización del inventario de la bodega original`
      );
    }
    //Marcado de historial
    const queryPostHistorial = postReqHistorial(
      cantidad,
      id_bodega_origen,
      id_bodega_destino,
      id_inventario,
      created_by,
      update_by,
      created_at,
      updated_at,
      deleted_at
    );
    const resultPostHistorial = await sqlQuery(queryPostHistorial);
    if (resultPostHistorial.status !== "sucess") {
      throw new Error(`Error al postear el historial del traslado`);
    }
    res.send("Traslado completado");
  } catch (error) {
    res.status(505).send(error.message);
  }
};

export const methodsHTTP = {
  listaProductos: listaProductos,
  nuevoInventario: nuevoInventario,
  trasladoProducto: trasladoProducto,
};
