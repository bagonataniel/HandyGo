const Service = require("../models/Service");
const jwt = require("jsonwebtoken");

exports.addService = async (req, res) => {
    const {title, description, category, price, location } = req.body;
    const userToken = req.header("x-auth-token");
    const userId = jwt.decode(userToken).id;

    if (!title || !description || !category || !price || !location) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(location)}&format=json`);
    const data = await response.json();

    if (data.length === 0) {
      return res.status(404).json({ error: 'Location not found' });
    }

    // Extract lat and lon from the first result
    const { lat, lon } = data[0];

    try {
        const newService = await Service.create(userId, title, description, category, price, lat, lon);
        res.status(201).json(newService);
    }
    catch(error){
        res.json(error)
    }
}

exports.getAllServices = async (req, res) => {
    try {
        const services = await Service.getAllService();
        res.status(200).json(services);
    }
    catch(error){
        res.json(error)
    }
}

exports.getServiceById = async (req, res) => {
    const id = req.params.id;
    console.log(id);
    
    try {
        const service = await Service.getServiceById(id);
        res.status(200).json(service);
    }
    catch(error){
        res.json(error)
    }
}

exports.updateService = async (req, res) => {
    const userToken = req.header("x-auth-token");
    const keys = Object.keys(req.body);
    const values = Object.values(req.body);

    const userId = jwt.decode(userToken).id;
    const serviceId = req.params.id;
    
    try{
        const update = await Service.updateService(userId, serviceId, keys, values)
        if (update.affectedRows === 0) {
            return res.status(404).json({ message: "Service not found or you're not authorized to update this service" });
        }
        res.status(200).json({ message: "Service updated successfully" });
    }
    catch(error){
        res.status(400).json({ error: error.message });
    }
}

exports.deleteService = async (req, res) => {
    const userToken = req.header("x-auth-token");
    const userId = jwt.decode(userToken).id;
    const serviceId = req.params.id;

    try {
        const remove = await Service.removeService(userId, serviceId)
        if (remove.affectedRows === 0) {
            return res.status(404).json({ message: "Service not found or you're not authorized to delete this service" });
        }
        res.status(200).json({ message: "Service deleted successfully" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

exports.createReview = async (req, res) => {
    const userToken = req.header("x-auth-token");
    const clientId = jwt.decode(userToken).id;
    const serviceId = req.params.id;
    const { rating } = req.body;

    try {
        const newReview = await Service.createReview(serviceId, clientId, rating);
        res.status(201).json(newReview);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}