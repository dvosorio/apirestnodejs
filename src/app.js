require('./config/config');

const express       = require('express');
const fileUpload    = require('express-fileupload');

const app = express();

// default options
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : './tmp/'
}));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// parse application/json
app.use(express.json());

app.get('/', function (req, res) {
    res.send('Bienvenido API REST');
});

app.use(require("./routes/index"));

app.listen(process.env.PORT, () => {
    console.log(`Example app listening at http://localhost:${process.env.PORT}`)
})