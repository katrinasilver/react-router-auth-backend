const TABLE_NAME = 'blog_comments'

exports.up = function(knex, Promise) {
  return knex.schema.createTable(TABLE_NAME, function(table){
    table.increments()
    table.integer('blog_posts_id').references('blog_posts.id')
    table.integer('users_id').references('users.id')
    table.text('comment')
    table.timestamps(true, true)
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists(TABLE_NAME)
};
