const Testimonial = require('../models/testimonial.model');
const sanitize = require('mongo-sanitize');

exports.getAll = async (req, res) => {
    try {
        res.json(await Testimonial.find({}));
    } catch (err){
        res.status(500).json({ message: err });
    }
};

exports.getId = async (req, res) => {
    try {
        const test = await Testimonial.findById(req.params.id);
        if(!test) res.status(404).json({ message: 'Not found' });
        else res.json(test);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

exports.getRandom = async (req, res) => {
    try {
        const count = await Testimonial.countDocuments();
        if (count === 0) {
            res.status(404).json({ message: 'No testimonials found' });
            return;
        }
        const rand = Math.floor(Math.random() * count);
        const test = await Testimonial.findOne().skip(rand);
        if(!test) res.status(404).json({ message: 'Not found' });
        else res.json(test);
      }
      catch(err) {
        res.status(500).json({ message: err });
      }
};

exports.post = async (req, res) => {
    const sanitizedData = {
        author: sanitize(req.body.author),
        text: sanitize(req.body.text)
    }
    try {
        const newTestimonial = new Testimonial(sanitizedData);
        await newTestimonial.save();
        res.json({ message: 'OK' });
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

exports.putId = async (req, res) => {
    try {
        const { author, text } = req.body;
        const test = await Testimonial.findById(req.params.id);
        if(test) {
            test.author = author;
            test.text = text;
            await test.save();
            res.json({ message: 'OK'});
        }
        else res.status(404).json({ message: 'Not found...' });
    } catch (err) {
        res.status(500).json({ message: 'Not found....'});
    }
};

exports.delete = async (req, res) => {
    try {
        const test = await Testimonial.findById(req.params.id);
        if(test) {
            await Testimonial.deleteOne({ _id: req.params.id });
            res.json({ message: 'OK' });
        }
        else res.status(404).json({ message: 'Not found...' });
    } catch (err) {
        res.status(500).json({ message: err });
    }
};