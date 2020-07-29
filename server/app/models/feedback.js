const monggose = require('mongoose');
const Schema = monggose.Schema;

const FeedbackSchema = new Schema({
    comment: {
        type: String,
        require: [true, 'comment is required']
    },
    airline: { 
        type: Schema.Types.ObjectId,
        require: [true, 'airline_id is required']
    },
    user: {
        type: Schema.Types.ObjectId,
        require: [true, 'user_id is required']
    }
});

const Feedback = monggose.model('feedback', FeedbackSchema);
module.exports = Feedback;