const { optionsSQLite }  = require("./options/SQLite3");
const knex = require("knex")(optionsSQLite);

knex.schema
        .createTable("mensajes", (table)  =>{
            table.increments("id");
            table.string("email", 15).notNullable();
            table.string("mensaje", 20).notNullable();
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


knex("mensajes").insert("./mensajes.txt")
    .then(() => console.log("Data inserted"))
    .catch((err) => { console.log(err); throw err })
    .finally(() => {
        knex.destroy()
    });