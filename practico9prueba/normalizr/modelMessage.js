import mongoose, { mongo } from "mongoose";

const mensajesSchema = new mongoose.Schema({
    autor: {
        id: String,
        nombre: String,
        apellido: String,
        edad: Number,
        alias: String,
        avatar: String
    },
    texto: String
});

const ModelMessage = mongoose.model("mensajes", mensajesSchema);
export default ModelMessage;
