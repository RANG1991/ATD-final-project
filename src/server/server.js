const schemas = require('./models/Schemas')
const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const { resolve } = require('path');
const fs = require('fs');
const path = require('path');



const config = {
    mongoURL: process.env.MONGO_URL || 'mongodb://localhost:27017/Test',
    port: 8000
};

//setup database
mongoose.Promise = global.Promise;
// MongoDB Connection
if (process.env.NODE_ENV !== 'test') {
    mongoose.connect(config.mongoURL, { useNewUrlParser: true }, (error) => {
        if (error) {
            console.error('Please make sure Mongodb is installed and running!');
            throw error;
        }else {
            console.log('connected to database!');
            var place = new schemas.PlaceModel({name:"restaurantTwo",address:"London",rating:5})
            console.log(("hello"))
            place.save(function (err, place) {
                if (err) return console.error(err);
                console.log(place.name + " saved to bookstore collection.");
            });

        }
    });
}



const app = express();

//body parser for json. must be done before API routes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false})); //handle body requests
console.log(__dirname);
app.use(express.static(path.join(__dirname, 'public')));







// Add backend api routes
fs.readdirSync(__dirname + '/api').forEach((file) => {
    require(`./api/${file.substr(0, file.indexOf('.'))}`)(app);
});


app.listen(config.port || 8000,
    () => console.log(`Listening on port ${process.env.PORT || 8000}!`));
