const TABLE_NAME = 'blog_posts_labels'

exports.seed = function(knex, Promise) {
  return Promise.all([knex('labels'),knex('blog_posts')])
  .then(([labels, blog_posts])=> {

    const blog_posts_labels = blog_posts.map(post => {
      return takeRandom(labels, Math.floor(Math.random() * (labels.length - 1)) + 1)
        .map(label => ({ blog_posts_id: post.id, labels_id: label.id}))
    })


    return knex(TABLE_NAME).insert(flatten(blog_posts_labels))
  })
  .then(() => {
    return knex.raw(`SELECT setval('${TABLE_NAME}_id_seq', (SELECT MAX(id) FROM ${TABLE_NAME}));`)
  })
};

function takeRandom(array, num){
  const retVal = []
  const copy = [...array]
  for(let i = 0; i < num; i++){
    const randomIndex = Math.floor(Math.random() * num)
    retVal.push(copy[randomIndex])
    copy.slice(randomIndex, 1)
  }

  return retVal;
}


function takeRandom(array, num){
  const retVal = []
  const copy = [...array]
  for(let i = 0; i < num; i++){
    const randomIndex = Math.floor(Math.random() * copy.length)
    retVal.push(copy[randomIndex])
    copy.splice(randomIndex, 1)
  }

  return retVal;
}

function flatten(arr) {
  return arr.reduce(function (flat, toFlatten) {
    return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
  }, []);
}
