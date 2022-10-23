const { options } = require("../options/options");
const knex = require("knex")(options.mysql);
const knexSql = require("knex")(options.sqlite3);
const Contenedor = require("./contenedor");

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


class Tablas {
  // Tabla productos
  async prod() {
      await knex.schema.dropTableIfExists("productos").then(() => {
      knex.schema
        .createTable("productos", (table) => {
          table.increments("id");
          table.string("nombre");
          table.float("precio");
          table.string("imagen");
        })
        .then(() => {
          console.log("tabla creada");
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          knex.destroy();
        });
        knex("productos").insert(getProducts()).then(()=>{
          console.log(getProducts());
        }).catch((err) =>{
          console.log(err);
        }).finally(() =>{
          knex.destroy();
        });
    });
  }

  // Tabla Mensajes
  async mess() {
    await knexSql.schema.dropTableIfExists("mensajes").then(() => {
      knexSql.schema
        .createTable("mensajes", (table) => {
            table.increments("id");
            table.string("email");
            table.string("mensaje");
        })
        .then(() => {
          console.log("tabla creada");
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          knex.destroy();
        });
        knex("mensajes").insert(getMessages()).then(()=>{
          console.log(getMessages());
        }).catch((err) =>{
          console.log(err);
        }).finally(() =>{
          knex.destroy();
        });
    });
  }
}

module.exports = Tablas;
