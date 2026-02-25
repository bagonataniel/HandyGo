const request = require('supertest');
const app = require('../app');

describe('Booking API', () => {
    let token = "";
    let service_id = "";
    let bookings = [];
    beforeAll(async ()=> {
        await request(app).post('/auth/register').send({ email: "testuser2@example.com", password: "123456", name: "testuser2" });
        const response = await request(app).post('/auth/login').send({ email: "testuser2@example.com", password: "123456" });
        token = response.body.JWT;
        const serviceResponse = await request(app).get('/service').set("x-auth-token", token)
        service_id = serviceResponse.body[0].id;
        
    })

    describe("booking/ (POST)", () => {
        it("should create a new booking", async () => {
            const res = await request(app)
            .post('/booking')
            .set("x-auth-token", token)
            .send({ "service_id": service_id });

        expect(res.statusCode).toBe(201);
        });

        it("should return 500 if service_id is missing", async () => {
            const res = await request(app)
            .post('/booking')
            .set("x-auth-token", token)
            .send({});

        expect(res.statusCode).toBe(500);
        });
    })

    describe("booking/:id (GET)", () => {
        it("should return 500 for invalid booking id", async () => {
            const res = await request(app)
            .get('/booking/invalid-id')
            .set("x-auth-token", token)
            
        expect(res.statusCode).toBe(500);
        });
    });

    describe("booking/bookings/client (GET)", () => {
        it("should list all client bookings", async () => {
            const res = await request(app)
            .get('/booking/bookings/client')
            .set("x-auth-token", token)
        
        bookings = res.body;
        expect(res.statusCode).toBe(200);
        });
    });

    describe("booking/:id/status (PUT)", () => {
        it("should return 500 for invalid id", async () => {
            const res = await request(app)
            .put('/booking/invalid-id/status')
            .set("x-auth-token", token)
            .send({ status: "folyamatban" });
            
        expect(res.statusCode).toBe(500);
        });
    });

    describe("booking/delete/:id (DELETE)", () => {
        it("should return 500 for invalid id", async () => {
            const res = await request(app)
            .delete('/booking/delete/invalid-id')
            .set("x-auth-token", token)
            
        expect(res.statusCode).toBe(500);
        });

        it("should delete a booking", async () => {
            const res = await request(app)
            .delete(`/booking/delete/${bookings[0].booking_id}`)
            .set("x-auth-token", token)
            
        expect(res.statusCode).toBe(200);
        });
    });
})