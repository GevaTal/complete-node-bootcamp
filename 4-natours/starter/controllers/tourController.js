/* eslint-disable no-console */
const Tour = require('./../models/tourModel');

exports.getTour = async (req, res) => {
    try {
        const tour = await Tour.findById(req.params.id);
        res.status(200).json({
            status: 'success',
            data: {
                tour,
            },
        });
    } catch (err) {
        res.status(404).json({ status: 'fail', message: err });
    }
};

exports.aliasTopTours = (req, res, next)=> {
    req.query.limit = '5';
    req.query.sort = '-ratingsAverage,price';
    req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
    next();
};

class APIFeatures {
    constructor(query, queryString){
        this.query = query;
        this.queryString = queryString;
    }

    filter(){
        // 1) Filtering
        const queryObj = { ...this.queryString };
        const excludeFields = ['page', 'sort', 'fields', 'limit'];
        excludeFields.forEach(el => delete queryObj[el]);
        let queryStr = JSON.stringify(queryObj);

        queryStr = queryStr.replace(
            /\b(gte|ge|lte|lt)\b/g,
            (match) => `$${match}`
        );
        
        this.query.find(JSON.parse(queryStr));

        
        
    }

    sort(){
        if (this.queryString.sort) {
         const sortBy = req.query.sort.split(',').join(' ');
        this.query = query.sort(sortBy);
    } else {
        query = query.sort('-createdAt');
    }
}
}

exports.getAllTours = async (req, res) => {
    try {
        // // 1) Filtering
        // const queryObj = { ...req.query };
        // const excludeFields = ['page', 'sort', 'fields', 'limit'];
        // excludeFields.forEach(el => delete queryObj[el]);
        // let queryStr = JSON.stringify(queryObj);

        // queryStr = queryStr.replace(
        //     /\b(gte|ge|lte|lt)\b/g,
        //     (match) => `$${match}`
        // );
        
        // let query = Tour.find(JSON.parse(queryStr));

        
        // if (req.query.sort){
        //     const sortBy = req.query.sort.split(',').join(' ');
        //     query = query.sort(sortBy);
        // } else {
        //     query = query.sort('-createdAt');
        // }

        //field limiting
        if (req.query.fields){
            const fields = req.query.fields.split(',').join(' ');
            query = query.select(fields);
        } else {
            query = query.select('-__v');
        }
        //pagination
        const page = req.query.page * 1 || 1;
        const limit = req.query.limit * 1 || 100;
        const skip = (page - 1) * limit;
        console.log(skip,limit);

        query = query.skip(skip).limit(limit);

        if (req.query.page){
            const numTours = await Tour.countDocuments();
            if (skip >= numTours) throw new Error('This page does not exist!');
        }
        
        const features = new APIFeatures(Tour.find(),req.query).filter();
        const tours = await features.query;

        res.status(200).json({
            status: 'success',
            results: tours.length,
            data: {
                tours,
            },
        });
    } catch (err) {
        res.status(404).json({ status: 'fail', message: err });
    }
};

exports.createTour = async (req, res) => {
    try {
        const newTour = await Tour.create(req.body);
        res.status(201).json({
            status: 'success',
            data: {
                tour: newTour,
            },
        });
    } catch (err) {
        console.log(err);
        res.status(404).json({
            status: 'fail',
            message: err,
        });
    }
};

exports.deleteTour = async (req, res) => {
    try {
        await Tour.findByIdAndDelete(req.params.id);
        res.status(204).json({
            status: 'success',
            data: null,
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err,
        });
    }
};

exports.updateTour = async (req, res) => {
    try {
        const tour = await Tour.findByIdAndUpdate(req.params.id,req.body,{
            new: true,
            runValidators: true,
        });
        res.status(200).json({
            status: 'success',
            data: {
                tour,
            },
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err,
        });
    }
};
