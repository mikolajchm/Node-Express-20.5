const express = require('express');
const { v4: uuidv4 } = require('uuid');
const db = require('../db');

const router = express.Router();

router.get('/concerts', (req, res) => {
    res.json(db.concerts);
});

router.get('/concerts/:id', (req, res) => {
    const concert = db.concerts.find(item => item.id == req.params.id);
    if (concert) {
        res.json(concert);
    } else {
        res.status(404).json({ message: 'Concert not found' });
    }
});

router.post('/concerts', (req, res) => {
    const { performer, genre, price, day, image } = req.body;
    if (performer && genre && price && day && image) {
        const newConcert = {
            id: uuidv4(),
            performer,
            genre,
            price,
            day,
            image
        };
        db.concerts.push(newConcert);
        res.json({ message: 'OK' });
    } else {
        res.status(400).json({ message: 'All fields are required' });
    }
});

router.put('/concerts/:id', (req, res) => {
    const { performer, genre, price, day, image } = req.body;
    const concert = db.concerts.find(item => item.id == req.params.id);
    if (concert) {
        if (performer) concert.performer = performer;
        if (genre) concert.genre = genre;
        if (price) concert.price = price;
        if (day) concert.day = day;
        if (image) concert.image = image;
        res.json({ message: 'OK' });
    } else {
        res.status(404).json({ message: 'Concert not found' });
    }
});

router.delete('/concerts/:id', (req, res) => {
    const index = db.concerts.findIndex(item => item.id == req.params.id);
    if (index !== -1) {
        db.concerts.splice(index, 1);
        res.json({ message: 'OK' });
    } else {
        res.status(404).json({ message: 'Concerts not found' });
    }
});

module.exports = router;