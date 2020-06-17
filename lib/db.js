'use strict'

const { MongoClient } = require('mongodb')
const {
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_NAME
} = process.env;

const mongoUrl = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`
let connection

async function connectDB() {
  if (connection) return connection

  let client

  try {
    client = await MongoClient.connect(mongoUrl, {
      useUnifiedTopology: true,
      useNewUrlParser: true
    })
    connection = client.db(DB_NAME)
  } catch(err) {
    console.error("Could not connect to db: ", mongoUrl, err)
    process.exit(1)
  }

  return connection
}

module.exports = connectDB