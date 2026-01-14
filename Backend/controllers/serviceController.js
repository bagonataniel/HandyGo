const Service = require("../models/Service");
const jwt = require("jsonwebtoken");

exports.addService = async (req, res) => {
    const { title, description, category, price, location } = req.body;
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
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}

exports.getAllServices = async (req, res) => {
    try {
        const services = await Service.getAllService();
        res.status(200).json(services);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}

exports.filterServices = async (req, res) => {
    const {lat, lon} = req.params;

    try {
        services = await Service.getAllService();
        for (let index = 0; index < services.length; index++) {
            coor1 = [parseFloat(lat) * Math.PI / 180, parseFloat(lon) * Math.PI / 180];
            coor2 = [parseFloat(services[index].latitude) * Math.PI / 180, parseFloat(services[index].longitude) * Math.PI / 180];
            
            a = Math.sin((coor2[0]-coor1[0])/2) * Math.sin((coor2[0]-coor1[0])/2) + Math.cos(coor1[0]) * Math.cos(coor2[0]) * Math.sin((coor2[1]-coor1[1])/2) * Math.sin((coor2[1]-coor1[1])/2);
            c = 2* Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
            d = 6371 * c;
            
            services[index].distance = d;
        }
        // res.status(200).json(services.filter(service => service.distance <= distance));
        res.status(200).json(services);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}

exports.getServiceById = async (req, res) => {
    const id = req.params.id;
    console.log(id);

    try {
        const service = await Service.getServiceById(id);
        res.status(200).json(service);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}

exports.updateService = async (req, res) => {
    const userToken = req.header("x-auth-token");
    const keys = Object.keys(req.body);
    const values = Object.values(req.body);

    const userId = jwt.decode(userToken).id;
    const serviceId = req.params.id;

    // Handle location update
    if (Array.from(keys).includes("location")) {
        const locationIndex = keys.indexOf("location")
        keys.splice(locationIndex, 1)
        values.splice(locationIndex, 1)
        keys.push("latitude", "longitude");
        const location = req.body.location;
        const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(location)}&format=json`);
        const data = await response.json();

        if (data.length === 0) {
            return res.status(404).json({ error: 'Location not found' });
        }
        values.push(data[0].lat, data[0].lon);
    }

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