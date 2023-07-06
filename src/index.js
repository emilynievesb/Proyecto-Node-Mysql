import app from "./app.js";
import config from "./config.js";

const main = () => {
  // configuracion de env

  app.listen(config, () =>
    console.log(`http://${config.hostname}:${config.port}`)
  );

  console.log(`The company's Server is running on port ${config.port}`);
};

// funcion que arranca todo
main();
