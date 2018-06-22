var userModel = require('./../models/userModel');
 
module.exports={

    userRegistration : function(api_request,api_response){
        console.log("signup at backend");
        var name = api_request.body.name;
        var email = api_request.body.email;
        var password = api_request.body.password;
        var result ={};
        var filter = {};
        result.status = false;
        try{
            filter.email = email;
            if(name != undefined && name != null && name !=""){
                if(email != undefined && email != null && email != ""){
                    if(password != undefined && password != null && password != ""){
                        userModel.find(filter,function(err,docs){
                            if(err){
                                console.log("error at database");
                                api_response.status(200).send(result);
                            }else{
                               if(docs.length>0){
                                result.status = true;
                                result.type = false;
                                result.message = "Email already exists.";
                                api_response.status(200).send(result);
                               }else{
                                var usermodel = new userModel();
                                usermodel.name = name;
                                usermodel.email = email;
                                usermodel.password = password;
                                usermodel.save(function(err,save){
                                    if(err){                                        
                                        result.message ="problem in our systems please try again";
                                        api_response.status(200).send(result);
                                    }else{
                                        result.message = "Successfully registered";
                                        result.type =true;
                                        result.status = true;
                                        api_response.status(200).send(result);
                                    }

                                });
                               }
                            }
                        });

                    }else{
                        result.message = "Password should be more than 5 characters";                    
                        api_response.status(200).send(result);
                    }
                }else{
                    result.message = "user Email should not be empty"; 
                    api_response.status(200).send(result);                   
                }
            }else{
                result.message = "user name should not be empty";
                api_response.status(200).send(result);
            }

        }catch (exception) {
            result.message = "problem in our systems please try again";
            result.status = false;
            result.type = "exception";
            console.log("Exception at signup services:",exception);
            api_response.status(200).send(result);
            
        }
        
    }
}