let express          = require('express');
let mongoose         = require('mongoose');
let bodyParser       = require('body-parser');
let cors             = require('cors');
let config           = require('./config/www');
let morgan           = require('morgan');
let expressValidator = require('express-validator');

let app = express();

//MiddleWare
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors());
app.use(expressValidator())

//Routers
app.use('/api', require('./route/routes'));

//Mongoose connection
mongoose.connect(config.database, {useMongoClient: true});
mongoose.connection.on('error', (err)=> { console.log(`Mongoose has an error ${err}`) });
mongoose.connection.on('connected', ()=> { console.log('Mongoose is ready!') });

//Server listen
app.listen(config.port, ()=> { console.log(`Server is ready on port: ${config.port}`) });