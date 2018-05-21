const TABLE_NAME = 'labels'

exports.seed = function(knex, Promise) {
  return knex(TABLE_NAME).insert([
    {label_text:'Javascript'},
    {label_text:'React'},
    {label_text:'Angular'},
    {label_text:'HTML'},
    {label_text:'CSS'},
    {label_text:'ExpressJS'},
    {label_text:'Postgres'},
    {label_text:'Knex'},
    {label_text:'Databases'},
    {label_text:'Backend'},
    {label_text:'Frontend'},
    {label_text:'AJAX'},
  ])
  .then(() => {
    return knex.raw(`SELECT setval('${TABLE_NAME}_id_seq', (SELECT MAX(id) FROM ${TABLE_NAME}));`)
  })
};
