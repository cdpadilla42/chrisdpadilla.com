
var mongoose = require('mongoose');

mongoose.connect(process.env.MONDB_URI);

var db = mongoose.connection;

// has error
db.on('error', console.error.bind(console, 'connection error:'));


export default db;

