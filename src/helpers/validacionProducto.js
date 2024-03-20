import { check } from "express-validator";
import resultadoValidacion from "./resultadoValidacion.js";

const validacionesProducto = [
    check("nombreProducto")
        .notEmpty()
        .withMessage("El nombre del producto es un dato obligatorio")
        .isLength({ min: 2, max: 20 })
        .withMessage(
            "El nombre del producto debe tener entre 2 y 20 caracteres"
        ),
    check("precio")
        .notEmpty()
        .withMessage("El precio es un dato obligatorio")
        .isNumeric()
        .withMessage("El precio tiene que ser un número")
        .custom((value) => {
            if (value >= 100 && value <= 2000) {
                return true
            } else {
                throw new Error("El precio debe estar entre $100 y $2000");
            }
        }),
    (req, res, next) => { resultadoValidacion(req, res, next) }
]

export default validacionesProducto