'use strict'
const connectDb = require('./db');

module.exports = {
  createCourse: async (root, { input }) => {
    const defaults = {
      teacher: '',
      topic: ''
    }
    let db
    let course
    let newCourse = Object.assign(defaults, input)
    try {
      db = await connectDb()
      course = await db.collection('courses').insertOne(newCourse)
      newCourse._id = course.insertedId
    } catch(err) {
      console.log(err)
    }

    return newCourse
  }
}