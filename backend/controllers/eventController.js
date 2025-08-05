const Event = require('../models/Event');

// Add New Event
exports.addEvent = async (req, res) => {
  try {
    const { title, description, eventDate, location, seatsLeft } = req.body;
    const event = new Event({ title, description, eventDate, location, seatsLeft });
    await event.save();
    res.json({ msg: 'Event added', event });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

// Get All Events
exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};
