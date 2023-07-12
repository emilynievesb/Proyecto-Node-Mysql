import getConnection from "../db/connect.js";
const connection = getConnection();

export const sqlQuery = (sql) => {
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

//!FUNCIONES NECESARIAS PARA ARCHIVO INVENTARIOS.CONTROLLERS.JS
//Función que retorna consultas INSERT INTO
export const postReqInv = (
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
export const updateReqInv = (id, cantidad) => {
  let query = /*sql */ `
    UPDATE inventarios
    SET cantidad = ${cantidad}
    WHERE id = ${id};
    `;
  return query;
};

//Función que retorna consultas select
export const searchReq = (id_bodega, id_producto) => {
  let query = /*sql */ `
    SELECT * FROM inventarios
    WHERE id_bodega = ${id_bodega} AND id_producto = ${id_producto};
    `;
  return query;
};

export const postReqHistorial = (
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

export const postBodegas = (
  nombre,
  id_responsable,
  estado,
  created_by,
  update_by,
  created_at,
  updated_at,
  deleted_at
) => {
  let query = /*sql */ `
    INSERT INTO bodegas (
    nombre,
    id_responsable,
    estado,
    created_by,
    update_by,
    created_at,
    updated_at,
    deleted_at
    ) VALUES (\"${nombre}\",${id_responsable},${estado},
    ${created_by},${update_by},\"${created_at}\",\"${updated_at}\",\"${deleted_at}\")
    `;
  return query;
};

export const postProduct = (
  nombre,
  descripcion,
  estado,
  created_by,
  update_by,
  created_at,
  updated_at,
  deleted_at
) => {
  let query = /*sql*/ `
    INSERT INTO productos (
        nombre,
        descripcion,
        estado,
        created_by,
        update_by,
        created_at,
        updated_at,
        deleted_at
    ) VALUES (\"${nombre}\",\"${descripcion}\",${estado},
    ${created_by},${update_by},\"${created_at}\",\"${updated_at}\",
    \"${deleted_at}\");
    `;
  return query;
};

export const lastId = () => {
  let query = /*sql*/ `
    SELECT LAST_INSERT_ID() AS id
    `;
  return query;
};
