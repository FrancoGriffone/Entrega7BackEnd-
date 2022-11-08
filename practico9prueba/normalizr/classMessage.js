import mongoose from "mongoose";
import ModelMessage from "modelMessage.js";

export default class Mensaje {

    constructor() {
        this.url = "mongodb+srv://FrancoGriffone:kaiin070@cluster0.okf5vxq.mongodb.net/Practico9?retryWrites=true&w=majority"
        this.mongodb = mongoose.connect 
    }

    //CREAR PRODUCTO
    async guardar(data){
        try {
            await this.mongodb(this.url)
            const newMessage = new ModelMessage(data)
            return await newMessage.save()
        } catch(e){
            console.log(e)
        }
    }

    //BUSCAR TODOS
    async listarAll(){
        try {
            await this.mongodb(this.url)
            return await ModelMessage.find()
        } catch(e){
            console.log(e)
        }
    }
}
