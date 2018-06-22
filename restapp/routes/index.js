var loginService = require('./../services/loginService');
var signupService = require('./../services/signupService');
var dashboardService = require('./../services/dashboardServices');

module.exports = function(app){
    console.log("Index.js");
    app.post('/api/loginUser',loginService.userLogin);

    app.post('/api/addUser',signupService.userRegistration);

    app.post('/api/setUserDomain',dashboardService.setUserDomain);
    
    app.get('/api/searchDomain',dashboardService.getDomainDetails);
}