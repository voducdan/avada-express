var mongoose = require('mongoose');
var theme = new mongoose.Schema({ name: 'string', image: 'string' },{collection:'product'});
module.exports =  mongoose.model('theme', theme);