const express = require('express');
const { v4: uuidv4 } = require('uuid');
const db = require('../db');

const router = express.Router();

router.get('/seats', (req, res) => {
    res.json(db.seats);
});

router.get('/seats/:id', (req, res) => {
    const seat = db.seats.find(item => item.id == req.params.id);
    if (seat) {
        res.json(seat);
    } else {
        res.status(404).json({ message: 'Seat not found' });
    }
});

router.post('/seats', (req, res) => {
    const { day, seat, client, email } = req.body;
    if (author && text) {
        const newSeat = {
            id: uuidv4(),
            day,
            seat,
            client,
            email

        };
        db.concerts.push(newSeat);
        res.json({ message: 'OK' });
    } else {
        res.status(400).json({ message: 'All fields are required' });
    }
});

router.put('/seats/:id', (req, res) => {
    const { day, seat, client, email } = req.body;
    const updatedSeat = db.seats.find(item => item.id == req.params.id);
    if (updatedSeat) {
        if (day) seat.day = day;
        if (seat) seat.seat = seat;
        if (client) seat.client = client;
        if (email) seat.email = email;
        res.json({ message: 'OK' });
    } else {
        res.status(404).json({ message: 'Seat not found' });
    }
});

router.delete('/seats/:id', (req, res) => {
    const index = db.seats.findIndex(item => item.id == req.params.id);
    if (index !== -1) {
        db.seats.splice(index, 1);
        res.json({ message: 'OK' });
    } else {
        res.status(404).json({ message: 'Seats not found' });
    }
});

module.exports = router;