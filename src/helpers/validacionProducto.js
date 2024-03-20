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
        check("imagen")
        .notEmpty()
        .withMessage("La imagen es un dato obligatorio")
        .matches(/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|jpeg|gif|png)/)
        .withMessage("La imagen debe tener una URL válida"),
        check("categoria")
        .notEmpty()
        .withMessage("La categoría es un dato obligatorio")
        .isIn(['Infusiones', 'Batidos', 'Dulce', 'Salado'])
        .withMessage("La categoría debe ser una de las siguientes opciones: 'Infusiones', 'Batidos', 'Dulce', 'Salado'"),
        check("descripcionBreve")
        .notEmpty()
        .withMessage("La descripción breve es un dato obligatorio")
        .isLength({ min: 10, max: 50 })
        .withMessage(
            "La descripción breve debe tener entre 10 y 50 caracteres"
        ),
        check("descripcionAmplia")
        .notEmpty()
        .withMessage("La descripción amplia es un dato obligatorio")
        .isLength({ min: 100, max: 400 })
        .withMessage(
            "La descripción amplia debe tener entre 100 y 400 caracteres"
        ),
    (req, res, next) => { resultadoValidacion(req, res, next) }
]

export default validacionesProducto