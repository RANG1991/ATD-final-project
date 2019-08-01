const schemas = require('./models/Schemas')
const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const {resolve} = require('path');
const fs = require('fs');
const path = require('path');


const config = {
    mongoURL: process.env.MONGO_URL || 'mongodb://localhost:27017/Database',
    port: 8000
};
var database;
//setup database
mongoose.Promise = global.Promise;
// MongoDB Connection
if (process.env.NODE_ENV !== 'test') {
    mongoose.connect(config.mongoURL, {useNewUrlParser: true}, (error,db) => {

        if (error) {
            console.error('Please make sure Mongodb is installed and running!');
            throw error;
        } else {
            database = db;
            console.log('connected to database!');


        }
    });
}


const app = express();

/*
//body parser for json. must be done before API routes
app.use(bodyParser.urlencoded({extended:false})); //handle body requests
console.log(__dirname);
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
// Add backend api routes

fs.readdirSync(__dirname + '/api').forEach((file) => {
    require(`./api/${file.substr(0, file.indexOf('.'))}`)(app);
});
*/
app.use(express.static(__dirname));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
//app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
var appRouter = express.Router();
app.use('/api', appRouter);
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.listen(config.port || 8000,
    () => console.log(`Listening on port ${process.env.PORT || 8000}!`));


app.post('/add_user', function (req, res) {

    res.setHeader('Content-Type', 'application/json');
    var photoSchema = new schemas.PhotoModel({
        name: 'profile',
        reviewerName: req.body.user.name,
        data: req.body.user.imagePath
    });
    var coorSchema = new schemas.coor({
        lat:req.body.user.lat,
        lng:req.body.user.lng
    })
    var newReviewerSchema = new schemas.ReviewerModel({
        name: req.body.user.name,
        id:req.body.user.id,
        coor:coorSchema,
        location:req.body.user.location,
        profilePhoto: photoSchema,
        reviews: [],
        photos: []
    });
    newReviewerSchema.save(function (err, place) {
        if (err) return console.error(err);
        console.log(place.name + " saved to users collection.");
    });
    res.end(JSON.stringify({ reqBody: req.body }));
});

app.post('/add_rev', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    console.log('current userrrrrrrrrrrrrrrrr ', req.body);
    let collection = database.collection('reviewermodels');
    console.log('current user ////////////// ', req.body.currentUser);
    console.log('current userrrrrrrrrrrrrrrrr ', req.body);
    collection.updateOne({'name': req.body.currentUser}, {$push: {reviews: req.body}})
    res.end();

});

app.post('/delete_rev', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    console.log('current userrrrrrrrrrrrrrrrr ', req.body);
    let collection = database.collection('reviewermodels');
    console.log('current user ////////////// ', req.body.username);
    console.log('current userrrrrrrrrrrrrrrrr ', req.body);
    collection.updateOne({'name': req.body.username}, {$pull: {reviews:{id:req.body.id}}})
    res.end();

});

app.post('/edit_rev', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    console.log('current userrrrrrrrrrrrrrrrr ', req.body);
    let collection = database.collection('reviewermodels');
    console.log('current user ////////////// ', req.body.currentUser);
    console.log('current userrrrrrrrrrrrrrrrr ', req.body);
    collection.updateOne({'name': req.body.currentUser,'reviews.id':req.body.id},{$set:{
            'reviews.$.bathroom':req.body.bathroom,
            'reviews.$.staff':req.body.staff,
            'reviews.$.cleanliness':req.body.cleanliness,
            'reviews.$.drive':req.body.drive,
            'reviews.$.delivery':req.body.delivery,
            'reviews.$.food':req.body.food,

        } });

    res.end();

});


app.post('/change_username', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    console.log('current userrrrrrrrrrrrrrrrr ', req.body);
    let collection = database.collection('reviewermodels');
    console.log('current user ////////////// ', req.body.oldName);
    console.log('current userrrrrrrrrrrrrrrrr ', req.body);
    collection.updateOne({'name': req.body.oldName},{$set:{name:req.body.newName} });

    collection.updateOne({'name': req.body.newName},{$set:{
            'reviews.$[].currentUser':req.body.newName,


        } });



    res.end();

});

app.post('/change_location', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    console.log('current userrrrrrrrrrrrrrrrr ', req.body);
    let collection = database.collection('reviewermodels');
    console.log('current userrrrrrrrrrrrrrrrr ', req.body);
    collection.updateOne({'name': req.body.username},{$set:{location:req.body.newLocation} });

    res.end();

})




app.post('/get_all_users', function (req, res) {

    res.setHeader('Content-Type', 'application/json');

        let collection = database.collection('reviewermodels');

        collection.find({}).toArray(function(err,category) {
            console.log("printing db data://///");
            console.log(category)

            res.send(JSON.stringify(category))
            console.log("inside collection find");
        });


    console.log("outside collection find");
       // console.log(JSON.stringify(userObj));
    //res.end(JSON.stringify({'hello':'hi'}))
    });
