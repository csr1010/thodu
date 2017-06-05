//loading necessary packages
var http = require('http'),
    path = require('path'),
    express = require('express'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    cors = require('cors'),
    errorhandler = require('errorhandler'),
    mongoUtil = require( './config/mongodbUtil' );
    
    // checking if current environment is production or not
var isProduction = process.env.NODE_ENV === "production";

//creating a global object
var app = express();

app.use(cors());
// Normal express config defaults
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(require('method-override')());
app.use(express.static(__dirname + '/public'));

app.use(session({ secret: 'thodu', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false  }));

if (!isProduction) {
  app.use(errorhandler());
}

app.use(require('./routes'));


if(isProduction){
  //mongoose.connect(process.env.MONGODB_URI);
} else {
    mongoUtil.connectToServer( function( err ) {
       console.log("connection success");
    });
}

//inorder to use routes folder, index.js must be present inside the folder
//

// finally, let's start our server...
var server = app.listen( process.env.PORT || 3000, function(){
  console.log('Listening on port ' + server.address().port);
});

