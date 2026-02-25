const request = require('supertest');
const app = require('../app'); // your app.js

describe('Services API', () => {
    let token = "";
    let id = "";
    beforeAll(async ()=> {
        await request(app).post('/auth/register').send({ email: "testuser2@example.com", password: "123456", name: "testuser2" });
        const response = await request(app).post('/auth/login').send({ email: "testuser2@example.com", password: "123456" });
        token = response.body.JWT;
    })

    describe('POST /services', () => {
        it('should create a new service successfully', async () => {
            const res = await request(app)
                            .post("/service")
                            .set("x-auth-token", token)
                            .send({title: "test service", description: "test description", category: "test", price: 100, location: "Kalocsa"})
            
            id = res.body.id
            expect(res.statusCode).toBe(201)
        }, 10000);

        it('should fail when creating new service', async () => {
            const res = await request(app)
                            .post("/service")
                            .set("x-auth-token", token)
                            .send({title: "test service", category: "test", price: 100, location: "Kalocsa"})
            
            expect(res.statusCode).toBe(400)
        })

        it('should fail when creating new service, unauthorized', async () => {
            const res = await request(app)
                            .post("/service")
                            .send({title: "test service", description: "test description", category: "test", price: 100, location: "Kalocsa"})
            
            expect(res.statusCode).toBe(403)
        })
    });

    describe("GET service/id", () =>{
        it('should return with a service', async () => {
            const res = await request(app)
                            .get("/service/" + id)
                            .set("x-auth-token", token)
            expect(res.statusCode).toBe(200)
        })

        it('should fail with a service request', async () => {
            const res = await request(app)
                            .get("/service/invalid-id")
                            .set("x-auth-token", token)
            expect(res.statusCode).toBe(404)
        })
    })


    afterAll(async () => {
        await request(app)
            .delete("/users/removeaccount/")
            .set("x-auth-token", token)
    })
    // PUT /service/update/:id
    // DELETE /service/delete/:id
})