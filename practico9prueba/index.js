import express from "express";
import {faker} from "@faker-js/faker";

const app = express();


function generarRandomObj(id){
    return {
        id: id,
        nombre: faker.commerce.productName(),
        apellido: faker.commerce.price(),
        color: faker.image.food(),
    }
}

app.get("/api/productos-test", (req, res)=>{
    let objetos = []
    const cantidadDatos = req.query.cant || 5
    for(let i=0; i<cantidadDatos; i++){
        objetos.push(generarRandomObj(i+1)
        )}
        res.json(objetos)
    })
const PORT = 8080;
const servidor = app.listen(PORT, ()=>{console.log(`Servidor Mock escuchando en el puerto: ${PORT}`);});
