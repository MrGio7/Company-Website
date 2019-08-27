exports.up = function(knex) {
  return knex.schema.createTable("likes", tbl => {
    tbl.increments();

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

    tbl
      .integer("likes")
      .notNullable()
      .defaultTo(1);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("likes");
};
