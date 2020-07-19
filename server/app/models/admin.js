const monggose = require('mongoose');
const Schema = monggose.Schema;

const AdminSchema = new Schema({
    permission:{
        type: String,
        require : [true,'permission is required']
    },
    user:{
        type: Schema.Types.ObjectId,
        require : [true, 'user_id is required']
    }
});

const Admin = monggose.model('admin', AdminSchema);
module.exports = Admin;