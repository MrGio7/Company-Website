exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("comments")
  .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("comments").insert([
        { text: "i like it", id_user: '2', id_product: '3'  },
        { text: "yea baby", id_user: '3', id_product: '2'  },
        { text: "wow wait a sec", id_user: '4', id_product: '4'  }
      ]);
    });
};
