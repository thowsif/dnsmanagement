const userModel = require("./../models/userModel");


module.exports = {
    setUserDomain: function (api_request, api_response) {
        console.log("Dashboard backend");
        var result = {};
        result.status = false;

        try {
            if (api_request.body.domainName != undefined && api_request.body.domainName != null) {
                let findFilter = {
                    domain_name: api_request.body.domainName.toUpperCase()
                }
                let projections = {
                    "_id": true,
                    "email": true,
                    "domain_name": true
                }

                userModel.find(findFilter, projections, function (err, domain_details) {
                    if (err) {
                        result.message = "problem on our systems please try again";
                        api_response.status(200).send(result);
                    } else {
                        if (domain_details && domain_details.length > 0 && domain_details._id) {
                            result.status = true;
                            result.type = false;
                            result.message = "Domain is already exists.";
                            api_response.status(200).send(result);
                        } else {
                            let filter = {
                                email: api_request.body.email
                            }
                            let update = findFilter;
                            userModel.findOne(filter, function (err, docs) {
                                if (err) {
                                    result.message = "problem on our systems please try again";
                                    api_response.status(200).send(result);
                                } else if (docs !== undefined && docs.domain_name !== undefined) {
                                    result.status = true;
                                    result.type = false;
                                    result.message = "You have already have a domain.";
                                    api_response.status(200).send(result);
                                }else{
                                    userModel.findOneAndUpdate(filter, update, { "domain_name": true }, function (error, res) {
                                        if (error) {
                                            result.message = "problem on our systems please try again";
                                            api_response.status(200).send(result);
                                        } else {
                                            result.message = "Succesfully registered your domain Name is" + res.domain_name;
                                            result.status = true;
                                            result.type = true;
                                            result.domainName = res.domain_name;
                                            api_response.status(200).send(result);
                                        }
                                    })
                                }
                            })
                            
                        }
                    }
                })
            } else {
                result.message = "Domain name should not be empty";
                api_response.status(200).send(result);
            }
        } catch (exception) {
            console.log("Exception at set domain", exception);
            result.message = "problem on our systems please try again";
            api_response.status(200).send(result);
        }
    },

    getDomainDetails: function (api_request, api_response) {
        var result = {};
        result.status = false;
        try {
            if (api_request.query.domainName != undefined && api_request.query.domainName != null) {
                var findFilter = {
                    domain_name: api_request.query.domainName.toUpperCase()
                }
                var projections = {
                    "_id": false,
                    "email": true,
                    "domain_name": true
                }

                userModel.find(findFilter, projections, function (err, user_details) {
                    if (err) {
                        result.message = "problem on our systems please try again";
                        api_response.status(200).send(result);
                    } else {
                        result.status = true;
                        if (user_details && user_details.length > 0) {
                            result.type = true;
                            result.details = user_details[0];
                            api_response.status(200).send(result);
                        } else {
                            result.type = false;
                            api_response.status(200).send(result);

                        }
                    }
                });
            } else {
                result.message = "Domain name should not be empty";
                api_response.status(200).send(result);
            }

        } catch (exception) {
            console.log("Exception at get domain details", exception);
            result.message = "problem on our systems please try again";
            api_response.status(200).send(result);
        }

    }
}