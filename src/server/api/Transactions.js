const schemas = require('../models/Schemas');
const fs = require('fs');
let request = require('request');

const addData = (username,imagePath) =>{
    console.log(typeof(imagePath));
    fs.writeFile("/home/ameer/Desktop/image.jpg", 'w+', (err, fd) => {
        let buf = Buffer.from(imagePath);
    });
    //fs.writeFile("/home/ameer/Desktop/image.jpg",imagePath)
        console.log("the location:  ",imagePath,"//////////")
            const profilePhoto = new schemas.PhotoModel({name:imagePath.split('/').last,
                path:imagePath,
                data:fs.readFileSync(imagePath)});
    const reviewer = new schemas.ReviewerSchema({name:username,profilePhoto:profilePhoto,reviews:[],photos:[]})

           // console.log(("hello " , reviewer.name));
            reviewer.save(function (err, reviewer) {
                if (err) return console.error(err);
                console.log(reviewer.name + " saved!");
            });
};

module.exports = addData