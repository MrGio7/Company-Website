exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("product")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("product").insert([
        {
          name: "myne",
          description: "this is very good product",
          img: "https://picsum.photos/id/237/200/300",
          price: "80$"
        },
        {
          name: "nya",
          description: "this is not  product",
          img: "https://picsum.photos/id/235/200/300",
          price: "0$"
        },
        {
          name: "jimi",
          description: "are u kiddin me",
          img: "https://picsum.photos/id/232/200/300",
          price: "2000$"
        },
        {
          name: "gulie",
          description: "god damn it",
          img: "https://picsum.photos/id/231/200/300",
          price: "2$"
        }
      ]);
    });
};
