'use strict'
const connectDb = require('./db');
const { ObjectID } = require('mongodb');

module.exports = {
  getCourses: async () => {
    let db
    let courses = []
    try {
      db = await connectDb()
      courses = await db.collection('courses').find().toArray()
    } catch(err) {
      console.log(err)
    }

    return courses
  },
  getCourse: async (root, { id }) => {
    let db
    let course = []
    try {
      db = await connectDb()
      course = await db.collection('courses')
        .findOne({ _id: ObjectID(id) })
    } catch(err) {
      console.log(err)
    }

    return course
  }
}