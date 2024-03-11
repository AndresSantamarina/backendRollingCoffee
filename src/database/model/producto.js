import mongoose, { Schema } from "mongoose";

const productoSchema = new Schema({
    nombreProducto: {
        type: String,
        required: true,
        unique: true,
        minLength: 2,
        maxLength: 20
    },
    precio: {
        type: Number,
        required: true,
        min: 100,
        max: 2000
    },
    imagen: {
        type: String,
        required: true
        //validar URL de imagen con una expresión regular
    },
    descripcionBreve: {
        type: String,
        required: true,
        minLength: 10,
        maxLength: 50
    },
    descripcionAmplia: {
        type: String,
        required: true,
        minLength: 100,
        maxLength: 400
    },
    categoria: {
        type: String,
        required: true,
        enum: ['Infusiones', 'Batidos', 'Dulce', 'Salado']
    }
})

const Producto = mongoose.model('producto', productoSchema);

export default Producto;