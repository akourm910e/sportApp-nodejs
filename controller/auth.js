var exports = module.exports = {}
 
exports.signUp = function(req, res) {
    res.render('signUp');
}

exports.signIn = function(req, res) {
    res.render('signIn');
}

exports.dashboard = function(req, res) {
    res.render('dashboard');
 
}