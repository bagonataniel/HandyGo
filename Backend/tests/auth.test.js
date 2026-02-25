const request = require('supertest');
const app = require('../app');

describe('Auth API', () => {

  const testUser = {
    email: 'testuser@example.com',
    password: '123456',
    name: 'Test User'
  };

  describe('POST /auth/register', () => {
    it('should register a new user successfully', async () => {
      const res = await request(app)
        .post('/auth/register')
        .send(testUser);

      expect(res.statusCode).toBe(201);
    });

    it('should fail if email already exists', async () => {
      await request(app).post('/auth/register').send(testUser);

      const res = await request(app)
        .post('/auth/register')
        .send(testUser);

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('error');
    });
  });

  describe('POST /auth/login', () => {
    beforeEach(async () => {
      await request(app).post('/auth/register').send(testUser);
    });

    it('should login successfully with correct credentials', async () => {
      const res = await request(app)
        .post('/auth/login')
        .send({ email: testUser.email, password: testUser.password });

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('JWT');
    });

    it('should fail login with incorrect password', async () => {
      const res = await request(app)
        .post('/auth/login')
        .send({ email: testUser.email, password: 'wrongpassword' });

      expect(res.statusCode).toBe(401);
      expect(res.body).toHaveProperty('error');
    });

    it('should fail login for non-existent user', async () => {
      const res = await request(app)
        .post('/auth/login')
        .send({ email: 'notfound@example.com', password: '123456' });

      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty('error');
    });
  });

  describe('DELETE /users/removeaccount', () => {
    let token;
    beforeAll(async () => {
      const loginRes = await request(app).post('/auth/login').send({ email: testUser.email, password: testUser.password });
      token = loginRes.body.JWT;
    })
    it('should delete the user account successfully', async () => {
      const res = await request(app).delete('/users/removeaccount')
        .set('x-auth-token', token);
      expect(res.statusCode).toBe(200);
    })
  });
});
