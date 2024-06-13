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
    if (day && seat && client && email) {
        const isSeatTaken = db.seats.some(item => item.day === day && item.seat === seat);
        if (isSeatTaken) {
            res.status(409).json({ message: 'The slot is already taken...' });
        } else {
            const newSeat = {
                id: uuidv4(),
                day,
                seat,
                client,
                email
            };

            db.seats.push(newSeat);
            req.io.emit('seatsUpdated', db.seats);
            res.json({ message: 'OK' });
        }
    } else {
        res.status(400).json({ message: 'All fields are required' });
    }
});

router.put('/seats/:id', (req, res) => {
    const { day, seat, client, email } = req.body;
    const updatedSeat = db.seats.find(item => item.id == req.params.id);
    if (updatedSeat) {
        if (day) updatedSeat.day = day;
        if (seat) updatedSeat.seat = seat;
        if (client) updatedSeat.client = client;
        if (email) updatedSeat.email = email;
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
        res.status(404).json({ message: 'Seat not found' });
    }
});

module.exports = router;