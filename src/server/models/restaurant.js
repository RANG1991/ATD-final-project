let mongoose = require('mongoose');
let Schema = mongoose.Schema;


let PhotoSchema = new Schema({
    name:String,
    reviewerName:String,
    uploaded:Date
});

let PlaceSchema = new Schema({
    name:String,
    address:String,
    rating:Number

});



let ReviewSchema = new Schema({
    title:String,
    text:String,
    rating:Number
});


let ReviewerSchema = new Schema({
    name:String,
    reviews:[ReviewSchema],
    photos:[PhotoSchema]


});



module.exports = mongoose.model('PhotoModel',PhotoSchema)
module.exports = mongoose.model('PlaceModel',PlaceSchema)
module.exports = mongoose.model('ReviewModel',ReviewSchema)
module.exports = mongoose.model('ReviewerModel',ReviewerSchema)