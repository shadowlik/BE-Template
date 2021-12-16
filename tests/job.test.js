const supertest = require('supertest');
const app = require('../src/app');

describe('jobs', () => {
  test('GET /jobs/unpaid', async () => {
    await supertest(app)
        .get('/jobs/unpaid')
        .set('profile_id', 1)
        .expect(200)
        .then((response) => {
          expect(Array.isArray(response.body)).toBeTruthy();
          expect(response.body.length).toEqual(1);
          const status = response.body.filter((item) => item.paid === true);
          expect(status.length).toBe(0);
        });
  });

  test('GET /jobs/unpaid', async () => {
    await supertest(app)
        .get('/jobs/unpaid')
        .set('profile_id', 2)
        .expect(200)
        .then((response) => {
          expect(Array.isArray(response.body)).toBeTruthy();
          expect(response.body.length).toEqual(2);
          const status = response.body.filter((item) => item.paid === true);
          expect(status.length).toBe(0);
        });
  });


  test('GET /jobs/unpaid', async () => {
    await supertest(app)
        .get('/jobs/unpaid')
        .expect(401);
  });

  test('POST /jobs/:id/pay', async () => {
    await supertest(app)
        .post('/jobs/1/pay')
        .expect(401);
  });

  test('POST /jobs/:id/pay', async () => {
    await supertest(app)
        .post('/jobs/1/pay')
        .set('profile_id', 1)
        .expect(200);
  });

  test('POST /jobs/:id/pay', async () => {
    await supertest(app)
        .post('/jobs/1/pay')
        .set('profile_id', 1)
        .expect(400);
  });

  test('POST /jobs/:id/pay', async () => {
    await supertest(app)
        .post('/jobs/5/pay')
        .set('profile_id', 4)
        .expect(400)
        .then((response) => {
          expect(typeof response.body.balance).toBe('number');
        });
  });
});
