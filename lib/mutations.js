'use strict'
const connectDb = require('./db');
const { ObjectID } = require('mongodb');

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
  },
  editCourse: async (root, { _id, input }) => {
    let db
    let course
    try {
      db = await connectDb()
      course = await db.collection('courses')
      .updateOne(
        { _id: ObjectID(_id) },
        { $set: input }
      )
      course = await db.collection('courses')
        .findOne({ _id: ObjectID(_id) })
    } catch(err) {
      console.log(err)
    }

    return course
  },
  deleteCourse: async (root, { _id }) => {
    let db
    try {
      db = await connectDb()
      await db.collection('courses')
      .deleteOne({ _id: ObjectID(_id) })
    } catch(err) {
      console.log(err)
    }

    return `The course was successfully removed: ${_id}`
  },

  createStudent: async (root, { input }) => {
    let db
    let student
    try {
      db = await connectDb()
      student = await db.collection('students').insertOne(input)
      input._id = student.insertedId
    } catch(err) {
      console.log(err)
    }

    return input
  },
  editStudent: async (root, { _id, input }) => {
    let db
    let student
    try {
      db = await connectDb()
      student = await db.collection('students')
      .updateOne(
        { _id: ObjectID(_id) },
        { $set: input }
      )
      student = await db.collection('students')
        .findOne({ _id: ObjectID(_id) })
    } catch(err) {
      console.log(err)
    }

    return student
  },
  deleteStudent: async (root, { _id }) => {
    let db
    try {
      db = await connectDb()
      await db.collection('students')
      .deleteOne({ _id: ObjectID(_id) })
    } catch(err) {
      console.log(err)
    }

    return `The student was successfully removed: ${_id}`
  },
}