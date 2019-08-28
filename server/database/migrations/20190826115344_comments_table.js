exports.up = function(knex) {
  return knex.schema.createTable("comments", tbl => {
    tbl.increments();

    tbl.string("text").notNullable();

    tbl.timestamps(true, true);

    tbl
      .integer("id_product")
      .references("id")
      .inTable("product")
      .notNullable()
      .unsigned()
      .onDelete("CASCADE")
      .onUpdate("CASCADE");

    tbl
      .integer("id_user")
      .references("id")
      .inTable("users")
      .notNullable()
      .unsigned()
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("comments");
};
