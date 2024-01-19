const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Course = require('../model/courseSchema');


router.post('/addcourse', (req, res) => {
    const { courseName, courseDescription, courseCode, courseLectureTimeStart, 
        courseLectureTimeEnd, courseLabTimeStart, courseLabTimeEnd, 
        instructor, location, studentId, labRequired} = req.body

    Course.findOne({courseCode})
        .then(course => {
             if(course!= null){
                 return res.status(400).json({
                     "status" : false,
                     "message" : "Course already exists"
                 })
             }
             else{
                 const newCourse = new Course({
                     courseName,
                     courseDescription,
                     courseCode,
                     courseLectureTimeStart,
                     courseLectureTimeEnd,
                     instructor,
                     location,
                     studentId
                 })

                 if(labRequired){
                     newCourse.courseLabTimeStart = courseLabTimeStart;
                     newCourse.courseLabTimeEnd = courseLabTimeEnd;
                 }

                 newCourse
                  .save()
                  .then(() => {
                         res.status(201).json({
                             "status" : true,
                             "message" : "Course added successfully"
                         })
                     })
             }
 
        })
});

router.get('/courses', (req, res) => {
    const studentId = req.body.studentId;
    Course.find({studentId})
        .then((course) => {
            if(course.length == 0){
                res.status(404).json({
                    "status" : false,
                    "message" : "No courses found"
                })
            }
             res.status(200).json({
                 "status" : true,
                 "courses" : course
             })
 
        })
        .catch((error) => {
             res.status(500).json({
                 "status" : false,
                 "message" : "Internal server error"
             })
         })

});


module.exports = router;
