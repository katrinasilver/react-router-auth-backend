const db = require('../../db')

module.exports.getAll = (orderByColumn='created_at', orderDirection='asc', offset=0, limit, searchColumns) => {
  console.log(searchColumns)

  const query = db('blog_posts')
    .select('blog_posts.id as id', 'title', 'body', 'blog_posts.created_at as created_at', 'blog_posts.updated_at as updated_at', 'username', 'users.id as users_id')
    .innerJoin('users', 'users.id', 'blog_posts.users_id')
    .orderBy(orderByColumn, orderDirection)
    .offset(offset)

  if(limit) query.limit(limit)

  if(searchColumns.month ){
    query.where(db.raw(`extract(month from blog_posts.created_at)=${searchColumns.month}`))
  }
  if(searchColumns.year){
    query.where(db.raw(`extract(year from blog_posts.created_at)=${searchColumns.year}`))
  }
  if(searchColumns.username){
    query.where('users.username',searchColumns.username)
  }
  if(searchColumns.label){

  }

  return query.then(data => {
    return Promise.all(data.map(post => {
      return db('blog_posts_labels').innerJoin('labels', 'labels.id', 'blog_posts_labels.labels_id')
      .select('label_text')
      .where({ blog_posts_id: post.id})
      .then(labels => {
        return {...post, labels:labels.map(({label_text})=> label_text)}
      })
    }))
    .then(posts => {
      if(searchColumns.label){
        return posts.filter(post => post.labels.indexOf(searchColumns.label) !== -1)
      }
      else{
        return posts
      }
    })
  })
}

module.exports.getAllMonthsWithBlogs = () => {
  return db.raw(`
    SELECT DISTINCT ON (num, year)
    extract(month from created_at) as num,
    to_char(created_at, 'Month') as month,
    extract(year from created_at) as year
    from blog_posts
    order by year, num;`)
    // removing unnecessary data from database response
    .then(raw => raw.rows)
    .then((allmonths) => allmonths.map(({num, month, year}) => ({ num, month:month.trim(), year })))
}

module.exports.create = (users_id, title, body, labelsIds) => {
  return db('blog_posts')
  .insert({users_id, title, body})
  .returning('*')
  .then(([newBlogPost]) => {
    return Promise.all([
      newBlogPost,
      db('blog_posts_labels').insert(labelsIds.map(label => ({blog_posts_id: newBlogPost.id, labels_id: label})))
    ])
  })
  .then(([blog_posts, labels])=> {
    return blog_posts
  })
}

module.exports.remove = (id, users_id)=> {
  return db('blog_posts').del()
  .where({id, users_id})
  .returning('*')
}
