const monggose = require('mongoose');
const Schema = monggose.Schema;

const FAQSchema = new Schema({
    question: {
        type: String,
        required: [true,'FAQ_question is required']
    },
    answer: {
        type: String,
        required: [true,'FAQ_question is required']
    }
});

const FAQ = monggose.model('faq', FAQSchema);
module.exports = FAQ;