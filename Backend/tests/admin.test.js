const request = require('supertest');
const app = require('../app');

describe('Admin API', () => {
    let token = ""
    const testUser = {
        password: '1234',
        username: 'admin'
    };

    describe('POST /admin/register', () => {
        beforeEach(async () => {
            const response = await request(app).post('/admin/login').send(testUser);
            token = response.body.JWT;
        });

        it('should register a new user successfully', async () => {
            const res = await request(app)
                .post('/admin/register')
                .set('x-admin-auth-token', token)
                .send({ username: "testuser", password: testUser.password });
            
            expect(res.statusCode).toBe(201);
        });

        it('should fail if name already exists', async () => {
            // register the user once
            await request(app).post('/admin/register').set('x-admin-auth-token', token).send({ username: "testuser", password: testUser.password });

            // try registering again
            const res = await request(app)
                .post('/admin/register')
                .set('x-admin-auth-token', token)
                .send({ username: "testuser", password: testUser.password });

            expect(res.statusCode).toBe(400);
            expect(res.body).toHaveProperty('error');
        });
    });

    describe('POST /admin/login', () => {

        it('should login successfully with correct credentials', async () => {
            const res = await request(app)
                .post('/admin/login')
                .send({ username: testUser.username, password: testUser.password });

            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('JWT');
        });

        it('should fail login with incorrect password', async () => {
            const res = await request(app)
                .post('/admin/login')
                .send({ username: testUser.username, password: 'wrongpassword' });

            expect(res.statusCode).toBe(401);
            expect(res.body).toHaveProperty('error');
        });

        it('should fail login for non-existent user', async () => {
            const res = await request(app)
                .post('/admin/login')
                .send({ username: 'notfound', password: '123456' });

            expect(res.statusCode).toBe(404);
            expect(res.body).toHaveProperty('error');
        });
    });
});
