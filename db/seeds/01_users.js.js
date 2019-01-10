const TABLE_NAME = 'users'

exports.seed = function(knex, Promise) {
  return knex(TABLE_NAME).insert([
    { id: 1, username:'Roger', password:'$2a$10$0Lj1fy.ePYZCPi6zg5h8/eMTRqD6z3/bWWFCWNcSh8cOfMHx4Qiku' },
    { id: 2, username:'Wes', password:'$2a$10$0Lj1fy.ePYZCPi6zg5h8/eMTRqD6z3/bWWFCWNcSh8cOfMHx4Qiku' },
    { id: 3, username:'Scott', password:'$2a$10$0Lj1fy.ePYZCPi6zg5h8/eMTRqD6z3/bWWFCWNcSh8cOfMHx4Qiku' },
    { id: 4, username:'Katrina', password:'$2a$10$0Lj1fy.ePYZCPi6zg5h8/eMTRqD6z3/bWWFCWNcSh8cOfMHx4Qiku' },
    { id: 5, username:'Matthew', password:'$2a$10$0Lj1fy.ePYZCPi6zg5h8/eMTRqD6z3/bWWFCWNcSh8cOfMHx4Qiku' },
    { id: 6, username:'Joey', password:'$2a$10$0Lj1fy.ePYZCPi6zg5h8/eMTRqD6z3/bWWFCWNcSh8cOfMHx4Qiku' },
    { id: 7, username:'Chris I', password:'$2a$10$0Lj1fy.ePYZCPi6zg5h8/eMTRqD6z3/bWWFCWNcSh8cOfMHx4Qiku' },
    { id: 8, username:'Jamie', password:'$2a$10$0Lj1fy.ePYZCPi6zg5h8/eMTRqD6z3/bWWFCWNcSh8cOfMHx4Qiku' },
    { id: 9, username:'Sarah', password:'$2a$10$0Lj1fy.ePYZCPi6zg5h8/eMTRqD6z3/bWWFCWNcSh8cOfMHx4Qiku' },
    { id: 10, username:'Celia', password:'$2a$10$0Lj1fy.ePYZCPi6zg5h8/eMTRqD6z3/bWWFCWNcSh8cOfMHx4Qiku' },
    { id: 11, username:'Brendan', password:'$2a$10$0Lj1fy.ePYZCPi6zg5h8/eMTRqD6z3/bWWFCWNcSh8cOfMHx4Qiku' },
    { id: 12, username:'Nolan', password:'$2a$10$0Lj1fy.ePYZCPi6zg5h8/eMTRqD6z3/bWWFCWNcSh8cOfMHx4Qiku' },
    { id: 13, username:'Chris K', password:'$2a$10$0Lj1fy.ePYZCPi6zg5h8/eMTRqD6z3/bWWFCWNcSh8cOfMHx4Qiku' },
    { id: 14, username:'Tristan', password:'$2a$10$0Lj1fy.ePYZCPi6zg5h8/eMTRqD6z3/bWWFCWNcSh8cOfMHx4Qiku' },
    { id: 15, username:'Kevin', password:'$2a$10$0Lj1fy.ePYZCPi6zg5h8/eMTRqD6z3/bWWFCWNcSh8cOfMHx4Qiku' },
    { id: 16, username:'Andrew', password:'$2a$10$0Lj1fy.ePYZCPi6zg5h8/eMTRqD6z3/bWWFCWNcSh8cOfMHx4Qiku' },
    { id: 17, username:'Toby', password:'$2a$10$0Lj1fy.ePYZCPi6zg5h8/eMTRqD6z3/bWWFCWNcSh8cOfMHx4Qiku' },
    { id: 19, username:'Michael', password:'$2a$10$0Lj1fy.ePYZCPi6zg5h8/eMTRqD6z3/bWWFCWNcSh8cOfMHx4Qiku' },
    { id: 20, username:'Dylan', password:'$2a$10$0Lj1fy.ePYZCPi6zg5h8/eMTRqD6z3/bWWFCWNcSh8cOfMHx4Qiku' }

  ])
  .then(() => {
    return knex.raw(`SELECT setval('${TABLE_NAME}_id_seq', (SELECT MAX(id) FROM ${TABLE_NAME}));`)
  })
};
