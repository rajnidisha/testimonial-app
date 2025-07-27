const Testimonial = require('../models/Testimonial');

// Show Home Page (form)
exports.getHome = (req, res) => {
  res.render('home');
};

// Handle form submission
exports.postTestimonial = async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.render('home', {
      error: 'Please fill in all fields.',
      name,
      email,
      message
    });
  }

  try {
    const newTestimonial = new Testimonial({ name, email, message });
    await newTestimonial.save();
    res.redirect('/testimonials');
  } catch (err) {
    console.error(err);
    res.render('home', {
      error: 'Error saving testimonial. Please try again.',
      name,
      email,
      message
    });
  }
};

// Get all testimonials
exports.getAllTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    res.render('testimonials', { testimonials });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error loading testimonials');
  }
};

// Get a single testimonial by ID
exports.getSingleTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) return res.status(404).send('Testimonial not found');
    res.render('testimonial', { testimonial });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error loading testimonial');
  }
};
