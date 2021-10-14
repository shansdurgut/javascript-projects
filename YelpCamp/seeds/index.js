const mongoose = require("mongoose");
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console,"connection error:"));
db.once("open", () => {
    console.log("Database Connected");
});


const sample = (array) => array[Math.floor(Math.random()*array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    const price = Math.floor(Math.random()*20 +10);
    for(let i =0; i < 50; i++){
        const random1000 = Math.floor(Math.random()*1000);
        const camp = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state} `,
            title: `${sample(descriptors)} ${sample(places)}`,
            image:'https://source.unsplash.com/collection/1315965',
            description:"<div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus aliquid animi blanditiis dolor dolore earum\n" +
                "    facere fugiat id illum ipsa nemo pariatur placeat praesentium, provident quasi quisquam suscipit ullam vel.</div>",
            price: price
        });
        await camp.save();
    };
};


seedDB().then(() => {
   mongoose.connection.close();
});