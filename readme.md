# API con Endpoints

Este es un repositorio de ejemplo que muestra cómo crear una API utilizando Node.js, Express, MySQL2 y dotenv. También se utiliza nodemon para facilitar el reinicio automático del servidor durante el desarrollo.

## Requisitos

Antes de comenzar, asegúrate de tener instalado lo siguiente en tu máquina:

- Node.js: https://nodejs.org
- MySQL: https://www.mysql.com

## Configuración

1.  Clona este repositorio en tu máquina local.
1.  Abre una terminal en la carpeta raíz del proyecto.
1.  Ejecuta el siguiente comando para instalar las dependencias necesarias:

        npm install

1.  Crea un archivo .env en la carpeta raíz del proyecto y agrega las siguientes variables de entorno:

        MY_CONFIG={"host":"localhost", "user":"root","database": NOMBRE_DB,"password":"", "port":3306}
        MY_SERVER={"hostname":"127.20.20.1", "port":5000}

    ###### Asegurate de cambiar NOMBRE_DB y demás configuraciones según tus necesidades

## Base de datos

Para obtener la base de datos, ejecuta el archivo `data.sql` que esta ubicado en la caperta padre.

## Ejecución

Para ejecutar correctamente el servidor debes asegurarte de tener `nodemon`, ya teniendo esta dependencia, solo escribes en la consola:

        npm run dev

## Endpoints

Para este proyecto se desarrollaron los siguiente endpoints diseñados para manipular la base de datos esperando los parametros por el body de la petición.

RECUERDA QUE LA IP DEL SERVIDOR SERÁ LA CORRESPONDIENTE EN EL ARCHIVO `.env` descrita en el `hostname`.

Los datos acontinuación son netamente ejemplos de lo que podrían contener los datos de entrada.

1.  Lista de bodegas ordenadas alfabéticamente

    - URL: `http://127.20.20.1:5000/bodega/listaBodegas`
    - Método: `GET`
    - Datos de entrada (body): Ninguno.
    - Datos de salida:

      ```{
          "status": "sucess",
          "data": [
          {
          "id": 50,
          "nombre": "A Bodega",
          "id_responsable": 11,
          "estado": 1,
          "created_by": null,
          "update_by": null,
          "created_at": "2023-05-25T06:02:57",
          "updated_at": "2023-05-25T06:02:57",
          "deleted_at": "2023-07-12T15:53:17"
          }]
      ```

1.  Creación de bodegas

    - URL: `http://127.20.20.1:5000/bodega/agregarBodega`
    - Método: `POST`
    - Datos de entrada (body):

      ```
          {
          "nombre": "A Bodega",
          "id_responsable": 11,
          "estado": 1,
          "created_by": null,
          "update_by": null,
          "created_at": "2023-05-25T06:02:57",
          "updated_at": "2023-05-25T06:02:57",
          "deleted_at": "2023-07-12T15:53:17"
          }
      ```

    - Datos de salida:

            Bodega creada correctamente

1.  Lista de productos con su total en inventario de todas las bodegas

    - URL: `http://127.20.20.1:5000/inventario/cantProductos`
    - Método: `GET`
    - Datos de entrada (body): Ninguno.
    - Datos de salida:

      ```
          "status": "sucess",
          "data": [
          {
          "id_producto": 27,
          "Total": "156772"
          },
          {
          "id_producto": 28,
          "Total": "96999"
          }]
      ```

1.  Agregar productos con inventario por default (en la bodega 11, con una cantidad de 100unds)

    - URL: `http://127.20.20.1:5000/producto/nuevoProducto`
    - Método: `POST`
    - Datos de entrada (body):

      ```
          {
          "nombre": "producto",
          "descripcion": "producto descripción",
          "estado": 1,
          "created_by": 13,
          "update_by": null,
          "created_at": "2023-05-25T06:02:57",
          "updated_at": "2023-05-25T06:02:57",
          "deleted_at": "2023-07-12T15:53:17"
          }
      ```

    - Datos de salida:

            Producto creado con su respectivo inventario

1.  Creación de un inventario nuevo o actualización del inventario (si el inventario ya existía)

    - URL: `http://127.20.20.1:5000/inventario/nuevoInventario`
    - Método: `POST`
    - Datos de entrada (body):

      ```
          {
          "id_bodega": 15,
          "id_producto": 30,
          "cantidad": 10
          }
      ```

    - Datos de salida:

            Inventario creado o actualizado

1.  Traslado de productos de bodega a bodega

    - URL: `http://127.20.20.1:5000/inventario/traslado`
    - Método: `POST`
    - Datos de entrada (body):

      ```
          {
          "id_producto": 30,
          "id_bodega_origen": 15,
          "id_bodega_destino": 15,
          "cantidad": 10
          "created_by": 13,
          "update_by": null,
          "created_at": "2023-05-25T06:02:57",
          "updated_at": "2023-05-25T06:02:57",
          "deleted_at": "2023-07-12T15:53:17"
          }
      ```

    - Datos de salida:

            Traslado completado

    #### Autora: Emily Nieves
