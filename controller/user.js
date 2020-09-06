var models = require("../database/models");

// const Op = Sequelize.Op;

module.exports = {
  // create some helper functions to work on the database
  createUser: function(req, res) {
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var email = req.body.email;
    var password = req.body.password;
    models.user.create({ firstName, lastName, email, password })
    .then(function(user) {
      return res.status(201).json({ success: "user created", data: user });
    })
    .catch(function(err) {
      return res
        .status(500)
        .json({ error: "not able to get users - " + err });
    });
  },
  getAllUsers: function(req, res) {
    models.user
      .findAll()
      .then(function(users) {
        return res.status(201).json(users);
      })
      .catch(function(err) {
        return res
          .status(500)
          .json({ error: "not able to get users - " + err });
      });
    // async () => {
    //   return await User.findAll();
    // }
  },

};
