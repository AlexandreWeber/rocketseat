const Bookin = require('../models/Booking')

module.exports = {
	async store(req, res) {
		const { booking_id } = req.params;

		const booking = await Bookin.findById(booking_id).populate('spot');

		booking.approved = true;

		await booking.save();

		const bookingSocket = req.connectedUsers[booking.user]
		if (bookingSocket) {
			req.io.to(bookingSocket).emit('booking_response', booking)
		}

		return res.json(booking)
	}
}