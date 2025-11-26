const Booking = require("../models/Booking");
const jwt = require("jsonwebtoken");


exports.createBooking = async (req, res) => {
    const service_id = req.body.service_id;
    const client_id = jwt.decode(req.header("x-auth-token")).id;
    
    try {
        const result = await Booking.create(service_id, client_id);
        res.status(201).json({ message: "Booking created", booking: result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.getBookingDetails = async (req, res) => {
    const booking_id = req.params.booking_id
    const id = jwt.decode(req.header("x-auth-token")).id;

    try {
        const booking = await Booking.getBookingDetails(booking_id, id);
        res.status(200).json({ booking });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.getBookingsAsClient = async (req, res) => {
    const client_id = jwt.decode(req.header("x-auth-token")).id;

    try {
        const bookings = await Booking.getBookingsAsClient(client_id);
        res.status(200).json({ bookings });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.getBookingsAsWorker = async (req, res) => {
    const worker_id = jwt.decode(req.header("x-auth-token")).id;

    try {
        const bookings = await Booking.getBookingsAsWorker(worker_id);
        res.status(200).json({ bookings });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.updateBookingStatus = async (req, res) => {
    const booking_id = req.params.id;
    const { status } = req.body;
    const worker_id = jwt.decode(req.header("x-auth-token")).id;

    try {
        const result = await Booking.updateStatus(booking_id, status, worker_id);
        res.status(200).json({ message: "Booking status updated", result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}