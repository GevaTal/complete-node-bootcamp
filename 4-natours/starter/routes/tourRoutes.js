const express = require('express');
const fs = require ('fs');
const app = express();
const router = express.Router();

app.use('/api/v1/tours',router);
const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));
const getTour = (req,res) => {
    const id = req.params.id*1;
    if (id > tours.length){
        return res.status(404).json({
            status:'fail',
            message: 'invalid ID'
        });
    }
    
    tour = tours.find(el => el.id === id);

    res.status(200).json({
        status:'success',
        data: {
            tour
        }
    })
}

const getAllTours = (req,res) => {
    console.log(req.requestTime);
    res.status(200).json({
        status:'success',
        results: tours.length,
        data: {
            tours
        }
    })
};

const createTour = (req,res) => {
    const newId = tours[tours.length - 1].id + 1;
    const newTour = Object.assign({id:newId},req.body);
    tours.push(newTour);
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`,JSON.stringify(tours),err => {
        res.status(201).json({
            status:'success',
            data:{
                tour : newTour
            }
        })
    });
}

const deleteTour = (req,res) => {
    const id = req.params.id*1;
    if (id > tours.length){
        return res.status(404).json({
            status:'fail',
            message: 'invalid ID'
        });
    }
    res.status(204).json({
        status:'success',
        data: null
    })
}

const updateTour = (req,res) => {
    const id = req.params.id*1;
    if (id > tours.length){
        return res.status(404).json({
            status:'fail',
            message: 'invalid ID'
        });
    }
    res.status(200).json({
        status:'success',
        data: {
            tours: '<Updated tour here>'
        }
    })
}


router.route('/').get(getAllTours).post(createTour);
router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);




module.exports = router;