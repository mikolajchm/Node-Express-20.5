const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const app = express();
const db = require('./db');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

const testimonialsRoutes = require('./routes/testimonials.routes');
const concertsRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');

app.use('/api', testimonialsRoutes);
app.use('/api', concertsRoutes);
app.use('/api', seatsRoutes);

app.use((req, res, next) => {
    res.status(404).json({ message: 'Not found...' });
});


app.listen(8000, () => {
    console.log('Server is running on port: 8000');
});