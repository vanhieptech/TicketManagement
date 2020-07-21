const monggose = require('mongoose');
const Schema = monggose.Schema;

const RegulationSchema = new Schema({
    name:{
        type:String,
        required:[true,'regulation_name is required']
    },
    value:{
        type:Number,
        required:[true,'regulation_value is required']
    },
    admin:{
        type:Schema.Types.ObjectId,
        ref:'user',
        required:[true,'regulation_admin is required']
    }
});

const Regulation = monggose.model('regulation', RegulationSchema);
module.exports = Regulation;