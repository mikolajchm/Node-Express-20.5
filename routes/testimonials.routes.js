const express = require('express');
const router = express.Router();
const TestimonialController = require('../controllers/testimonials.controller');

router.get('/testimonials', TestimonialController.getAll);
router.get('/testimonials/:id', TestimonialController.getId);
router.get('/testimonials/random', TestimonialController.getRandom);
router.post('/testimonials', TestimonialController.post);
router.put('/testimonials/:id', TestimonialController.putId);
router.delete('testimonial/:id', TestimonialController.delete);

module.exports = router;