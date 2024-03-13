import Producto from "../database/model/producto.js"

export const listarProductos = async (req, res) => {
    try {
        //pedir a la DB la lista de la colección de productos
        const productos = await Producto.find();
        res.status(200).json(productos)
    } catch (error) {
        console.log(error)
        res.status(404).json({
            mensaje: "No se pudo encontrar la lista de productos"
        })
    }
}

export const obtenerProducto = async (req, res) => {
    try {
        console.log(req.params.id)
        //si encontre el producto
        const productoBuscado = await Producto.findById(req.params.id)
        res.status(200).json(productoBuscado)
    } catch (error) {
        console.log(error)
        res.status(404).json({
            mensaje: "No se encontró el producto solicitado"
        })
    }
}

export const crearProducto = async (req, res) => {
    try {
        //verificar los datos del body
        console.log(req.body)
        //validar los datos
        //pedir a la DB crear el producto
        const productoNuevo = new Producto(req.body);
        await productoNuevo.save();
        //enviar el status 201
        res.status(201).json({
            mensaje: "El producto fue creado correctamente"
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            mensaje: "No se pudo procesar la solicitud de crear producto"
        })
    }
}

export const editarProducto = async (req, res) => {
    try {
        //extraer el id y buscar el producto
        //si no encuentro el id responder con un mensaje de error
        const buscarProducto = await Producto.findById(req.params.id)
        if (!buscarProducto) {
            return res.status(404).json({
                mensaje: "No se pudo editar el producto, el id es incorrecto"
            })
        }
        //pedir a la DB modificar el producto que tiene tal id, con los datos de req.body
        await Producto.findByIdAndUpdate(req.params.id, req.body)
        //contestar con un mensaje de que todo salió bien
        res.status(200).json({
            mensaje: "El producto fue modificado exitosamente"
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            mensaje: "Ocurrió un error al intentar editar el producto"
        })
    }
}

export const borrarProducto = async (req, res) => {
    try {
        //extraer el id y buscar el producto
        //si no encuentro el id responder con un mensaje de error
        const buscarProducto = await Producto.findById(req.params.id)
        if (!buscarProducto) {
            return res.status(404).json({
                mensaje: "No se pudo eliminar el producto, el id es incorrecto"
            })
        }
        //pedir a la DB modificar el producto que tiene tal id, con los datos de req.body
        await Producto.findByIdAndDelete(req.params.id)
        //contestar con un mensaje de que todo salió bien
        res.status(200).json({
            mensaje: "El producto fue eliminado exitosamente"
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            mensaje: "Ocurrió un error al intentar eliminar el producto"
        })
    }
}