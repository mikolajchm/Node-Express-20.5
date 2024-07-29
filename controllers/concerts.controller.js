const Concert = require('../models/concert.model');
const sanitize = require('mongo-sanitize');

exports.getAll = async (req, res) => {
    try {
        res.json(await Concert.find());
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

exports.getId = async (req, res) => {
    try {
        const cnt = await Concert.findById(req.params.id);
        if(!cnt)res.status(404).json({ message: 'Not found' });
        else res.json(cnt);
    } catch (err) {
        res.status(500).json({ message: 'Concert not found' });
    }
};

exports.post = async (req, res) => {
    const sanitizedData = {
        performer: sanitize(req.body.performer),
        genre: sanitize(req.body.genre),
        price: sanitize(req.body.price),
        day: sanitize(req.body.day),
        image: sanitize(req.body.image)
    }
    try {
        const newConcert = new Concert(sanitizedData);
        await newConcert.save();
        res.json({ message: 'OK'});
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

exports.putId = async (req, res) => {
    const { performer, genre, price, day, image } = req.body;

    try {
        const cnt = await Concert.findById(req.params.id);
        if(cnt) {
            cnt.performer = performer;
            cnt.genre = genre;
            cnt.price = price;
            cnt.day = day;
            cnt.image = image;
            await cnt.save();
            res.json({ message: 'OK' });
        }
        else res.status(404).json({ message: 'Not found...' });
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

exports.delete = async (req, res) => {
    try {
        const cnt = await Concert.findById(req.params.id);
        if(cnt) {
            await Concert.deleteOne({ _id: req.params.id });
            res.json({ message: 'OK' });
        } else res.status(404).json({ message: 'Not found...' });
    } catch (err) {
        res.status(500).json({ message: err });
    }
};
