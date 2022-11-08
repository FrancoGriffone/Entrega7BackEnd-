import { normalize, denormalize, schema } from "normalizr";
import util from "util";
import classMessage from "classMessage.js"

const getMessage = async () => {
    const mensajes = await classMessage.getAll();
    if (mensajes) {
        return mensajes;
    } else {
        return [];
    }
};

const autor = new schema.Entity("autor")
const autorTexto = new schema.Entity("autorTexto", {
    gerente: empleado,
    encargado: empleado,
    empleados: [empleado]
})

const mensajes = new schema.Entity("mensajes", {
    contenido: [autorTexto]
})
