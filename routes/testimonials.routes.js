const express = require('express');
const { v4: uuidv4 } = require('uuid');
const db = require('../db');

const router = express.Router();

router.get('/testimonials', (req, res) => {
    res.json(db.testimonials);
});

router.get('/testimonials/:id', (req, res) => {
    const testimonial = db.testimonials.find(item => item.id == req.params.id);
    if (testimonial) {
        res.json(testimonial);
    } else {
        res.status(404).json({ message: 'Testimonial not found' });
    }
});

router.get('/testimonials/random', (req, res) => {
    const randomIndex = Math.floor(Math.random() * db.testimonials.length);
    res.json(db.testimonials[randomIndex]);
});

router.post('/testimonials', (req, res) => {
    const { author, text } = req.body;
    if (author && text) {
        const newTestimonial = {
            id: uuidv4(),
            author,
            text
        };
        db.testimonials.push(newTestimonial);
        res.json({ message: 'OK' });
    } else {
        res.status(400).json({ message: 'Author and text are required' });
    }
});

router.put('/testimonials/:id', (req, res) => {
    const { author, text } = req.body;
    const testimonial = db.testimonials.find(item => item.id == req.params.id);
    if (testimonial) {
        if (author) testimonial.author = author;
        if (text) testimonial.text = text;
        res.json({ message: 'OK' });
    } else {
        res.status(404).json({ message: 'Testimonial not found' });
    }
});

router.delete('/testimonials/:id', (req, res) => {
    const index = db.testimonials.findIndex(item => item.id == req.params.id);
    if (index !== -1) {
        db.testimonials.splice(index, 1);
        res.json({ message: 'OK' });
    } else {
        res.status(404).json({ message: 'Testimonial not found' });
    }
});

module.exports = router;