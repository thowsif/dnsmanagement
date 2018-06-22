var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt-nodejs');

var dnsuser = new Schema({
    name:{
        type:String,
    },
    email :{
        type : String,
    },
    password:{
        type : String,
    },
    domain_name:{
        type:String
    } 

},{ versionKey: false });

dnsuser.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

dnsuser.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('dnsusers', dnsuser);
