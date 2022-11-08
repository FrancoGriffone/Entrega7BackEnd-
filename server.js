const express = require("express");
const Contenedor = require("./class/contenedor");
const { Server: ServerHttp } = require("http");
const { Server: ServerIo } = require("socket.io");
import {faker} from "@faker-js/faker";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

//Handlebars
app.set("view engine", "ejs");
app.set("views", "./public/views");

const HttpServer = new ServerHttp(app);
const io = new ServerIo(HttpServer);

const getProducts = async () => {
    const contenedor = new Contenedor("./productos.txt");
    const productos = await contenedor.getAll();
    if (productos) {
        return productos;
    } else {
        return [];
    }
};

const getMessages = async () => {
    const contenedor = new Contenedor("./mensajes.txt");
    const mensajes = await contenedor.getAll();
    if (mensajes) {
        return mensajes;
    } else {
        return [];
    }
};

const generarFechaHora = () => {
    const fecha = new Date();
    const fechaStr = 
    ("00" + fecha.getDate()).slice(-2) + "/" +
    ("00" + (fecha.getMonth() + 1)).slice(-2) + "/" +
    fecha.getFullYear() + " " +
    ("00" + fecha.getHours()).slice(-2) + ":" +
    ("00" + fecha.getMinutes()).slice(-2) + ":" +
    ("00" + fecha.getSeconds()).slice(-2);

    return fechaStr;
}

io.on("connection", async (socket) => {

    socket.emit("mensaje-productos", await getProducts().then((data) => data));

    socket.emit("mensaje-chat", await getMessages().then((data) => data));

    socket.on("producto-nuevo", async (producto) => {
        const contenedor = new Contenedor("./productos.txt");
        const { nombre, precio, imagen } = producto;
        await contenedor.save({
            nombre,
            precio,
            imagen,
        });
        io.sockets.emit("mensaje-productos", await getProducts().then((data)=>data))
    }) 
    socket.on("chat-nuevo", async (chat) => {
        const contenedor = new Contenedor("./mensajes.txt");
        const { mail, mensaje } = chat;
        await contenedor.save({
            mail,
            fechahora: generarFechaHora(),
            mensaje,
        });
        io.sockets.emit("mensaje-chat", await getMessages().then((data)=>data));
    })
});

app.get("/api/producto-test", async (req, res) => {
    try {
        res.render("pages/ingresar", {});
    } catch (error){
        res.json({ error });
    }
});

const PORT = process.env.PORT || 8080;
const server = HttpServer.listen(PORT, () => {
    console.log(`Escuchando en puerto ${server.address().port}`);
});