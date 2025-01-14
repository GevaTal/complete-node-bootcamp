const fs = require('fs');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const Tour = require('../../models/tourModel');
dotenv.config({ path: './config.env' });
console.log(process.env.DATABASE);

const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
);
mongoose
    .connect(DB, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
    })
    .then((con) => {
        console.log('DB connection successful!');
    });

//READ JSON FILE
const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8')
);
//import data to DB
const importData = async () => {
    try {
        await Tour.create(tours);
        console.log('Data loaded!');
        process.exit();
    } catch (err) {
        console.log(err);
    }
};

//DELETE ALL DATA FROM COLLECTION
const deleteData = async () => {
    try {
        await Tour.deleteMany();
        console.log('Data Deleted!!!');
        process.exit();
    } catch (err) {
        console.log(err);
    }
};

console.log(process.argv);
if (process.argv[2] === '--import') {
    importData();
} else if (process.argv[2] === '--delete') {
    deleteData();
}
