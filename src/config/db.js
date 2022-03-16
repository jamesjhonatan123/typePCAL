import faunadb from 'faunadb'
const client = new faunadb.Client({
  secret: process.env.REACT_APP_DB_KEY,
  domain: 'db.fauna.com',
})

const q = faunadb.query

export {client, q}