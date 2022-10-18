const fs = require("fs");

class Contenedor {
    constructor(ubicacion){
        this.ubicacion = ubicacion;
        this.proximoId = 1;
    }

    async stringToObj(){
        try{
            let dataArch = await fs.promises.readFile(this.ubicacion, "utf-8").then((data) => data);
            let dataArchParse = JSON.parse(dataArch);

            if (dataArchParse.length){
                let proximoId = dataArchParse[dataArchParse.length - 1].id + 1;

                this.proximoId = proximoId;
            } else {
                this.proximoId = 1;
            }

            return dataArchParse;
        } catch(error){
            console.log(error);
        }
    }

    async save(obj){
        try{
            let dataArchParse = await this.stringToObj().then((data) => data);
            if(dataArchParse.length){
                await fs.promises.writeFile(
                    this.ubicacion,
                    JSON.stringify(
                        [...dataArchParse, {...obj, id: this.proximoId }],
                        null,
                        2
                    )
                );
            } else {
                await fs.promises.writeFile(
                    this.ubicacion,
                    JSON.stringify([{ ...obj, id: this.proximoId }], null, 2)
                );
            }
            return this.proximoId;
        } catch(error){
            console.log(error);
        }
    }

    async getAll(){
        try{
            let dataArchParse = await this.stringToObj().then((data) => data);

            if(dataArchParse.length){
                return dataArchParse;
            } else {
                console.log("No hay productos");
            }
        } catch(error){
            console.log(error);
        }
    }
}

module.exports = Contenedor;