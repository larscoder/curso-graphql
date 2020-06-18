'use strict'
const connectDb = require('./db');
const { ObjectID } = require('mongodb');
const errorHandler = require('./errorHandler');

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
      errorHandler(err)
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
      errorHandler(err)
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
      errorHandler(err)
    }

    return `The course was successfully removed: ${_id}`
  },

  createPerson: async (root, { input }) => {
    let db
    let student
    try {
      db = await connectDb()
      student = await db.collection('students').insertOne(input)
      input._id = student.insertedId
    } catch(err) {
      errorHandler(err)
    }

    return input
  },
  editPerson: async (root, { _id, input }) => {
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
      errorHandler(err)
    }

    return student
  },
  deletePerson: async (root, { _id }) => {
    let db
    try {
      db = await connectDb()
      await db.collection('students')
      .deleteOne({ _id: ObjectID(_id) })
    } catch(err) {
      errorHandler(err)
    }

    return `The student was successfully removed: ${_id}`
  },

  addPeople: async (root, { courseID, personID }) => {
    let db
    let course
    let person
    try {
      db = await connectDb()
      course = await db.collection('courses')
        .findOne({ _id: ObjectID(courseID) })
      person = await db.collection('students')
        .findOne({ _id: ObjectID(personID) })

      if (!course || !person) throw new Error('Person or Course not exist.')

      await db.collection('courses')
        .updateOne(
          { _id: ObjectID(courseID) },
          { $addToSet: { people: ObjectID(personID) } }
        )
    } catch (err) {
      errorHandler(err)
    }

    return course
  }
}