const { optionsDB }  = require("./options/mariaDB");
const knex = require("knex")(optionsDB);

knex.schema
        .createTable("productos", (table) => {
            table.increments("id");
            table.string("nombre", 15).notNullable();
            table.float("price", 5);
            table.string("imagen", 20).notNullable();
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

knex("productos").insert("./productos.txt")
    .then(() => console.log("Data inserted"))
    .catch((err) => { console.log(err); throw err })
    .finally(() => {
        knex.destroy()
    });

/* const productos = []
*/