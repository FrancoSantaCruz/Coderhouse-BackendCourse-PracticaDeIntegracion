// Debo especificar en mi package.json que voy a trabajar con ES Module ya que nodejs trabaja
// con import de forma nativa, y nosotros queremos trabajar con ES Module. 
// "type": "module",
import express from 'express';
import productsRouter from './router/products.router.js'
import { __dirname } from './utils.js'; // Importamos de utils la creacion de __dirname

// Activo el módulo express para poder hacer uso de ella e iniciar el servidor.
const app = express();

// Para que nuestro servidor express pueda interpretar en forma automática mensajes de tipo JSON en formato urlencoded (req.body)
// debemos indicarlo en forma explícita, agregando las siguientes lineas luego de crearlo. 
app.use(express.json())
app.use(express.urlencoded({extended:true}))

// Importamos .static para ocupar el middleware que nos ayuda a dirigir donde se encuentran nuestros archivos estáticos. 
// .static('ubicacion de public') -> La ubicación de public lo hacemos con Path Absolutos.
app.use(express.static(__dirname+'/public'))

/*SIN PRODUCTMANAGER
const users = [
    {
        id: 1,
        nombre: "Franco",
        edad: 24
    },
    {
        id: 2,
        nombre: "Agustin",
        edad: 22
    },
    {
        id: 3,
        nombre: "Martina",
        edad: 21
    },
    {
        id: 4,
        nombre: "Lilian",
        edad: 25
    },
    {
        id: 5,
        nombre: "Martin",
        edad: 18
    },
]
// Con app.get le decimos al servidor que hacer al momento de iniciar. (Ruta)
app.get('/', (req, res) => {
    res.send('Bienvenido!');
});

// Params : - solo se manda información puntual o identificadores únicos (Como ids de usuarios).
// Query ? - Ordenamiento, filtrado, cantidad de usuarios a mostrar, etc.

app.get('/users/', (req, res) => {
    const { sort } = req.query;
    const sortUsers = sort === 'ASC' ? users.sort((a, b) => a.nombre.localeCompare(b.nombre)) : users.sort((a, b) => b.nombre.localeCompare(a.nombre));
    res.json(sortUsers)
})

app.get('/users/:id', (req, res) => {
    const { id } = req.params;
    // Con el signo + delante de la variable parse de str a int. Params devuelve un string siempre.
    // También se puede usar ~~ para parsear ó parseInt()
    const user = users.find(u => u.id == +id)
    res.json({ user })
})
*/


// Asignar un puerto al que el servidor debe escuchar para las peticiones.
app.listen(8080, () => {
    console.log("Listening server on port 8080. \nhttp://localhost:8080/ ");
});


// Routes
app.use('/api/products',productsRouter);
