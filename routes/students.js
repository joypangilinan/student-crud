var express = require('express')
var bodyParser = require('body-parser')
const mongoose = require('mongoose')

const Students = require('../models/students')

const studentsRouter = express.Router()


studentsRouter.use(bodyParser.json())
studentsRouter.route('/')

    .get((req, res, next) => {
        //res.render('index');
        Students.find({})
            .then((student) => {
                console.log(student)
                //res.json(student)
                res.render('index', { students: student })
            }, (err) => next(err))
            .catch((err) => next(err))
    })
    .put((req, res, next) => {
        res.statusCode = 403
        res.end('PUT operation not supported on /studentslist')
    })
    .delete((req, res, next) => {
        Students.remove({})
            .then((resp) => {
                res.StatusCode = 200
                res.setHeader('Content-Type', 'application/json')
                res.json(resp)
            }, (err) => next(err))
            .catch((err) => next(err))
    })
studentsRouter.route('/newstudent')
    .get((req, res, next) => {
        res.render('newstudent')
    })
    .post((req, res, next) => {
        var id = req.body.sid
        if (id.match(/\d{4}-\d{5}\b/g)) {
            Students.create(req.body)
                .then((student) => {
                    console.log('New Student added successfully ', student)
                    res.redirect("/studentlist")
                }, (err) => next(err))
                .catch((err) => next(err))

        } else {
            err = new Error('Invalid id')
            err.status = 406
            return next(err)
        }
    })

studentsRouter.route('/profile/:studentId')
    .get((req, res, next) => {
        var id = req.params.studentId
        if (id.match(/\d{4}-\d{5}\b/g)) {
            Students.findOne({ sid: req.params.studentId })
                .then(student => {
                    if (student == null) {
                        err = new Error('Student ' + req.params.studentId + ' not found')
                        err.status = 404
                        return next(err)
                    } else {

                        res.render('view', { students: student })
                    }

                }, (err) => next(err))
                .catch((err) => next(err))
        } else {
            err = new Error('Invalid id')
            err.status = 406
            return next(err)
        }
    })

studentsRouter.route('/:studentId')
    .post((req, res, next) => {
        res.statusCode = 403
        res.end('POST operation not supported on /studentlist/' + req.params.studentId)
    })
studentsRouter.route('/edit/:studentId')
    .get((req, res, next) => {
        var id = req.params.studentId
        if (id.match(/\d{4}-\d{5}\b/g)) {
            Students.findOne({ sid: req.params.studentId })
                .then(student => {
                    if (student == null) {
                        err = new Error('Student ' + req.params.studentId + ' not found')
                        err.status = 404
                        return next(err)
                    } else {
                        res.render('editstudent', { students: student })
                    }

                }, (err) => next(err))
                .catch((err) => next(err))
        } else {
            err = new Error('Invalid id')
            err.status = 406
            return next(err)
        }
    })
    .post((req, res, next) => {
        var id = req.body.sid
        if (id.match(/\d{4}-\d{5}\b/g)) {
            Students.findOneAndUpdate({ sid: req.params.studentId }, {
                $set: req.body
            }, { new: true })
                .then(student => {
                    res.redirect("/studentlist")
                }, (err) => next(err))
                .catch((err) => next(err))
        } else {
            err = new Error('Invalid id')
            err.status = 406
            return next(err)
        }
    })
studentsRouter.route('/delete/:studentId')
    .get((req, res, next) => {
        var id = req.params.studentId
        if (id.match(/\d{4}-\d{5}\b/g)) {
            Students.findOneAndRemove({ sid: req.params.studentId })
                .then(resp => {
                    if (resp == null) {
                        err = new Error('Student ' + req.params.studentId + ' not found')
                        err.status = 404
                        return next(err)
                    } else {
                        console.log("success")
                        res.redirect("/studentlist")
                    }
                }, (err) => next(err))
                .catch((err) => next(err))
        } else {
            err = new Error('Invalid id')
            err.status = 406
            return next(err)
        }
    })


module.exports = studentsRouter