const Seat = require('../models/seat.model');

exports.getAll = async (req, res) => {
    try {
        res.json(await Seat.find({}));
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

exports.getId = async (req, res) => {
    try {
        const st = await Seat.findById(req.params.id);
        if(!st) res.status(404).json({ message: 'Not found' });
        else res.json(st);
    } catch (err) {
        res.status(500).json({ message: err }); 
    }
};

exports.post = async (req, res) => {
    const { day, seat, client, email } = req.body;
    try{
        const newSeat = new Seat({ day, seat, client, email });
        await newSeat.save();
        res.json({ message: 'OK'});
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

exports.putId = async (req, res) => {
    const { day, seat, client, email } = req.body;
    try { 
        const st = await Seat.findById(req.params.id);
        if (st) {
            st.day = day;
            st.seat = seat;
            st.client = client;
            st.email = email;
            await st.save();
            res.json({ message: 'OK' });
        } else res.status(404).json({ message: 'Not found' });
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

exports.delete = async (req, res) => {
    try{
         const st = await Seat.findById(req.params.id);
         if(st){
            await Seat.deleteOne({ _id: req.params.id });
            res.json({ message: 'OK' });
         }
    } catch (err) {
        res.status(500).json({ message: err });
    } 
};
