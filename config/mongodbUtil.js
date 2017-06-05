var mongoClient = require( 'mongodb' ).MongoClient;

var _db;

module.exports = {
  connectToServer: function( callback ) {
    var mongoConnectionString = "mongodb://thodu:thodu@ds151451.mlab.com:51451/thodu";
    mongoClient.connect( mongoConnectionString, function( err, db ) {
      _db = db;
      return callback( err );
    });
  },

  getDb: function() {
    return _db;
  }
};