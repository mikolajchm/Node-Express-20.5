const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const app = express();
const db = require('./db');
const socket = require('socket.io');
const path = require('path')

const server = app.listen(process.env.PORT || 8000, () => {
    console.log('Server is running...');
});
  
const io = socket(server);

io.on('connection', (socket) => {
    console.log('New socket!', socket.id);
});  

app.use((req, res, next) => {
    req.io = io;
    next();
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '/client/build')));

const testimonialsRoutes = require('./routes/testimonials.routes');
const concertsRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');

app.use('/api', testimonialsRoutes);
app.use('/api', concertsRoutes);
app.use('/api', seatsRoutes);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.use((req, res, next) => {
    res.status(404).json({ message: 'Not found...' });
});
