import express from 'express';
import cors from 'cors';
import 'dotenv/config'; //permite procesar variables de entorno
import morgan from 'morgan';
import {fileURLToPath} from 'url';
import path from 'path';

//1- configurar un puerto
//puedo compilar el index.js usando node --watch index.js en forma experimental

const app = express();
//crear una variable
app.set('port',process.env.PORT || 4000)
app.listen(app.get('port'), ()=>{
    console.log('Estoy en el puerto ' + app.get('port'))
})

//2- configurar los middlewares del proyecto
app.use(cors()) //permitir conexiones remotas
app.use(morgan('dev')) //nos da info extra en la terminal
app.use(express.json()) //interpretar datos en formato json
app.use(express.urlencoded({extended: true})) //ayuda a interpretar los datos del body del request
//falta configurar el index.html
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
// console.log(__filename)
app.use(express.static(path.join(__dirname, '/public')))

//3- configurar las rutas
app.get('/nuevo', (req, res)=>{
    console.log('Alguien solicito algo')
    //falta configurar la respuesta
    res.send('respuesta desde nuestro backend de rollingCoffee')
})