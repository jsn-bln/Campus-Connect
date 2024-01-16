const mongoose = require('mongoose');


const activitySchema = mongoose.Schema({
    assignment:{
        type:String,
        dueDate:Date
    },
    quiz:{
        type:String,
        dueDate:Date

    },
    exam:{
        type:String,
        date:Date
    },
    labExercise:{
        type:String,
        dueDate:Date
    }



    
});

const Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;