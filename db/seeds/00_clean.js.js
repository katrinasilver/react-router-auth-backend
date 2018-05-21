exports.seed = function(knex, Promise) {

  const tablesToClean = ['blog_posts_labels','labels','blog_comments', 'blog_posts', 'users']

  return tablesToClean.reduce((acc, ele) => acc.then(() => knex(ele).del()), Promise.resolve())

};
