let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let PhotoSchema = new Schema({
    name:String,
    reviewerName:String,
    data:String
    //uploaded:Date
});

let PlaceSchema = new Schema({
    name:String,
    address:String,
    rating:Number
});

let ReviewSchema = new Schema({
    restaurant:String,
    location: String, images: [String], bathroom: Number,
    staff: Number, cleanliness: Number,
    drive: Number, delivery: Number, food: Number
});

let ReviewerSchema = new Schema({
    name:String,
    location:String,
    profilePhoto:PhotoSchema,
    reviews:[String],
    photos:[PhotoSchema]
});

module.exports = {
     PhotoModel : mongoose.model('PhotoModel', PhotoSchema),
     PlaceModel :mongoose.model('PlaceModel', PlaceSchema),
     ReviewModel : mongoose.model('ReviewModel', ReviewSchema),
     ReviewerModel : mongoose.model('ReviewerModel', ReviewerSchema)
};