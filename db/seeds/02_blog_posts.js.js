const axios = require('axios')
const TABLE_NAME = 'blog_posts'


exports.seed = function(knex, Promise) {
  const blog_posts = [...Array(200).keys()].map(ele => {
    return Promise.all([
      axios.get('https://jaspervdj.be/lorem-markdownum/markdown.txt?num-blocks=100'),
      knex.raw('select id from users order by random() limit 1')
    ])
    .then(([response, user]) => {
      return {
        id:ele+1,
        title:`Blog Post ${ele+1}`,
        users_id: user.rows[0].id,
        body:response.data
      }
    })
  })

  return Promise.all(blog_posts)
  .then(blog_posts => {
    var publishedDate = new Date('2015-01-10');

    return blog_posts.map(ele => {
      publishedDate = new Date(publishedDate.getTime() + Math.ceil(Math.random() * 10)*1000*60*60*24)
      return {...ele, created_at: publishedDate, updated_at: publishedDate}
    })
  })
  .then(blog_posts => knex(TABLE_NAME).insert(blog_posts))
  .then(() => {
    return knex.raw(`SELECT setval('${TABLE_NAME}_id_seq', (SELECT MAX(id) FROM ${TABLE_NAME}));`)
  })
};
