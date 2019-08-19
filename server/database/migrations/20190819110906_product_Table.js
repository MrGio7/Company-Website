exports.up = function(knex) {
  return knex.schema.createTable("product", product => {
    product.increments();

    product.string("name", 255).notNullable();

    product.string("description", 255).notNullable();

    product.string("img", 255).notNullable();

    product.integer("price").notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("product");
};
