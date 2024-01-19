const mongoose = require('mongoose');


const activitySchema = mongoose.Schema({
    activityType:{
        type:String,
        enum: ['Assignment', 'Labtest', 'Midterm Exam', 'Final Exam', 'Quiz', 'Other'],
        required:true
    },
    dueDate:{
        type:Date,
        required:true
    },
    studentId:{
        type:Number,
        required:true
    },
    courseCode:{
        type:String,
        required:true
    }



    
});

const Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;