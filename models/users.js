var mongoose = require('./connection.js');

var userSchema = mongoose.Schema({
    email: String,
    username: String,
    password: String,
    token: String,
    articleIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'articles' }]
});

var UserModel = mongoose.model('users', userSchema);

module.exports = UserModel;