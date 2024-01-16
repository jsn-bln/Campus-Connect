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
    courseTime: {
        type: Date
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