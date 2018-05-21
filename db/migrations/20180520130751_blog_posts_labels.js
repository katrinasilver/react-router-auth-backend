const TABLE_NAME = 'blog_posts_labels'

exports.up = function(knex, Promise) {
  return knex.schema.createTable(TABLE_NAME, function(table){
    table.increments()
    table.integer('blog_posts_id').references('blog_posts.id')
    table.integer('labels_id').references('labels.id')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists(TABLE_NAME)
};
