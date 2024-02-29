const mongoose = require('mongoose');


const courseSchema = mongoose.Schema({
    courseName:{
        type:String,
        required:true
    },
    courseDescription:{
        type:String,
        required:true
    },
    courseLectureTimeStart: {
        type: Date,
        required:true
    },
    courseLectureTimeEnd: {
        type: Date,
        required:true
    },
    courseLabTimeStart: {
        type: Date,
    },
    courseLabTimeEnd: {
        type: Date,
    },
    courseCode:{
        type:String,
        required:true,
        unique:true
    },
    studentId:{
        type:String,
        required:true
    },
    instructor:{
        type:String
    },
    location:{
        type:String
    }


    
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;    