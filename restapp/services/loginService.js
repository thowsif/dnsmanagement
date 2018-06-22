var userModel = require('./../models/userModel');


module.exports = {

    userLogin : function(api_request,api_response){
        console.log("Yes we are right");
        userModel.find({},function(err,docs){
            if(err){
                console.log("error at database");
                api_response.send("error");
            }else{
                var ret = {};
                ret.message = "results";
                ret.response = docs;
                console.log("Docs at db",docs);
                api_response.send(ret);
            }
        });
    }
}