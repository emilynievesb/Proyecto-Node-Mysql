import { number, object, string, date } from "yup";

const addProductValidator = async (req, res, next) => {
  try {
    const productSchema = object({
      nombre: string()
        .strict()
        .matches(/^[a-z A-Z]+$/, "Is not in correct format")
        .required(),
      descripcion: string().optional(),
      estado: number().max(1).required(),
      created_by: number().nullable().optional(),
      update_by: number().nullable().optional(),
      created_at: date().nullable().optional(),
      updated_at: date().nullable().optional(),
      deleted_at: date().nullable().optional(),
    });
    await productSchema.validate(req.body);
    next();
  } catch (error) {
    res.status(400).json({ status: "fail", message: error.errors });
  }
};

const addInventoryValidator = async (req, res, next) => {
  try {
    const inventorySchema = object({
      id_bodega: number().required(),
      id_producto: number().required(),
      cantidad: number().required(),
      created_by: number().nullable().optional(),
      update_by: number().nullable().optional(),
      created_at: date().nullable().optional(),
      updated_at: date().nullable().optional(),
      deleted_at: date().nullable().optional(),
    });
    await inventorySchema.validate(req.body);
    next();
  } catch (error) {
    res.status(400).json({ status: "fail", message: error.errors });
  }
};

const addBodegaValidator = async (req, res, next) => {
  try {
    const bodegaSchema = object({
      nombre: string()
        .strict()
        .matches(/^[a-z A-Z]+$/, "Is not in correct format")
        .required(),
      id_responsable: number().required(),
      estado: number().max(1).required(),
      created_by: number().nullable().optional(),
      update_by: number().nullable().optional(),
      created_at: date().nullable().optional(),
      updated_at: date().nullable().optional(),
      deleted_at: date().nullable().optional(),
    });
    await bodegaSchema.validate(req.body);
    next();
  } catch (error) {
    res.status(400).json({ status: "fail", message: error.errors });
  }
};

const addHistoryValidator = async (req, res, next) => {
  try {
    const historySchema = object({
      id_producto: number().required(),
      cantidad: number().required(),
      id_bodega_origen: number().required(),
      id_bodega_destino: number().required(),
      created_by: number().nullable().optional(),
      update_by: number().nullable().optional(),
      created_at: date().nullable().optional(),
      updated_at: date().nullable().optional(),
      deleted_at: date().nullable().optional(),
    });
    await historySchema.validate(req.body);
    next();
  } catch (error) {
    res.status(400).json({ status: "fail", message: error.errors });
  }
};

export {
  addProductValidator,
  addInventoryValidator,
  addBodegaValidator,
  addHistoryValidator,
};
