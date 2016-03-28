/**
 * Created by cer on 2016/3/27.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: String,
    password: String,
    email: String,
    createTime:{
        type:Date,
        default:Date.now
    }
});

exports.User = mongoose.model('User',userSchema);
