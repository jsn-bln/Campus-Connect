const express = require('express')
const router = express.Router()
const Activity = require('../model/activitySchema')


router.get('/activities', (req, res) => {
    const {studentId, courseCode} = req.body

    Activity.find({studentId:studentId, courseCode:courseCode})
        .then((activities) => {
            if(activities.length == 0){
                res.status(404).json({
                    "status" : false,
                    "message" : "No activities found"
                })
            }
             res.status(200).json({
                 "status" : true,
                 "activities" : activities
             })
        })
        .catch((err) => {
             res.status(500).json({
                 "status" : false,
                 "message" : "Internal server error"
             })
 
        })

})


router.post('/activity', (req, res) => {
    const {activityType, dueDate, studentId, courseCode} = req.body
    const newActivity = new Activity({
        activityType,
        dueDate,
        studentId,
        courseCode
    })

    newActivity.save()
        .then(() => {
             res.status(201).json({
                 "status" : true,
                 "message" : "Activity added successfully"
             })
 
        })
        .catch(err => {
             res.status(500).json({
                 "status" : false,
                 "message" : "Internal server error"
             })
        })
})