const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A Tour must have a name!'],
        unique: true,
    },
    duration: {
        type: Number,
        required: [true, 'a tour must have a duration'],
    },
    maxGroupSize: {
        type: Number,
        required: [true, 'tour must have a group size'],
    },
    difficulty: {
        type: String,
        required: [true, 'bla'],
    },
    ratingsAverage: {
        type: Number,
        default: 4.5,
    },
    ratingsQuantity: {
        type: Number,
        default: 0,
    },
    price: {
        type: Number,
        required: [true, 'A Tour must have a price!'],
    },
    priceDiscount: Number,
    summary: {
        type: String,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
        required: [true, 'bla'],
    },
    imageCover: {
        type: String,
        required: [true, 'bla'],
    },
    images: [String],
    createdAt: {
        type: Date,
        default: Date.now(),
        select: false,
    },
    startDates: [Date],
});
const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
