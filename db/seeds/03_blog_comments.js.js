const TABLE_NAME = 'blog_comments'

exports.seed = function(knex, Promise) {
  return knex(TABLE_NAME).insert([

  ])
  .then(() => {
    return knex.raw(`SELECT setval('${TABLE_NAME}_id_seq', (SELECT MAX(id) FROM ${TABLE_NAME}));`)
  })
};
