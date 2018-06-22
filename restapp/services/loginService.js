var userModel = require('./../models/userModel');


module.exports = {

    userLogin : function(api_request,api_response){
        console.log("Yes we are at Login");
        var email = api_request.body.email;
        var password = api_request.body.password;
        var result ={};
        result.status =false;
        try{
            if(email != undefined && email != null && email != ""){
                if(password != undefined && password != null){
                    var findFilter = {
                        "email":email
                    }
                    userModel.findOne(findFilter,function(error,user_details){
                        if(error){
                            result.message = "error in our systems please try again";
                            api_response.status(200).send(result);
                        }else{
                            if(user_details && user_details._id ){
                                if (password && user_details.password == password) {
                                    let name = user_details.name;
                                    result.status =true;
                                    result.type = "sucess";
                                    result.name = name;
                                    api_response.status(200).send(result);
                                }else{
                                    result.message ="Invalid Password.";
                                    api_response.status(200).send(result);            
                                }
                            }else{
                                result.message ="Invalid Email.";
                                api_response.status(200).send(result);                           
                            }
                        }

                    });

                }else{
                    result.message ="Password should not be empty";
                    api_response.status(200).send(result);
                }
            }else{
                result.message ="Email should not be empty";
                api_response.status(200).send(result);
            }
        }catch(exception){
            console.log("Exception at login services",exception);
            result.type ="error";
            result.message = "There is problem in our systems please try again";
            api_response.status(200).send(result);
        }
    }
}