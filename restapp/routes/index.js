var loginService = require('./../services/loginService');

module.exports = function(app){
    console.log("Index.js");
    app.get('/api/userLogin',loginService.userLogin);
}