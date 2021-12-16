const supertest = require('supertest');
const app = require('../src/app');

describe('balance', () => {
  test('POST /balances/deposit/:id - 401', async () => {
    await supertest(app)
        .post('/balances/deposit/1')
        .expect(401);
  });

  test('POST /balances/deposit/:id - 401', async () => {
    await supertest(app)
        .post('/balances/deposit/1')
        .set('profile_id', 1)
        .send({amount: 100000})
        .expect(400);
  });

  test('POST /balances/deposit/:id - 401', async () => {
    await supertest(app)
        .post('/balances/deposit/1')
        .set('profile_id', 1)
        .send({amount: 20})
        .expect(200);
  });
});
