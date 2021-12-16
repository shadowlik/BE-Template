const supertest = require('supertest');
const app = require('../src/app');

describe('contracts', () => {
  test('GET /contracts/1 - 401', async () => {
    await supertest(app)
        .get('/contracts/1')
        .set('profile_id', 0)
        .expect(401);
  });

  test('GET /contracts/1 - 404', async () => {
    await supertest(app)
        .get('/contracts/1321')
        .set('profile_id', 1)
        .expect(404);
  });

  test('GET /contracts/1 - 200', async () => {
    await supertest(app)
        .get('/contracts/1')
        .set('profile_id', 1)
        .expect(200)
        .then((response) => {
          expect(response.body.id).toEqual(1);

          expect(response.body.status).toBe('terminated');
        });
  });

  test('GET /contracts - 401', async () => {
    await supertest(app)
        .get('/contracts')
        .expect(401);
  });

  test('GET /contracts - 200', async () => {
    await supertest(app)
        .get('/contracts')
        .set('profile_id', 1)
        .expect(200)
        .then((response) => {
          expect(Array.isArray(response.body)).toBeTruthy();
          expect(response.body.length).toEqual(1);
        });
  });

  test('GET /contracts - 200', async () => {
    await supertest(app)
        .get('/contracts')
        .set('profile_id', 3)
        .expect(200)
        .then((response) => {
          expect(Array.isArray(response.body)).toBeTruthy();
          expect(response.body.length).toEqual(2);
        });
  });

  test('GET /contracts - 200', async () => {
    await supertest(app)
        .get('/contracts')
        .set('profile_id', 3)
        .expect(200)
        .then((response) => {
          expect(Array.isArray(response.body)).toBeTruthy();
          expect(response.body.length).toEqual(2);
          const status = response.body.map((item) => item.status);
          expect(status.includes('terminated')).toBe(false);
        });
  });
});
