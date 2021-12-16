const supertest = require('supertest');
const app = require('../src/app');

describe('report', () => {
    test('GET /admin/best-clients', async () => {
        await supertest(app)
            .get('/admin/best-clients')
            .expect(200)
            .then((response) => {
                expect(Array.isArray(response.body)).toBeTruthy();
                expect(response.body.length).toEqual(2);
              });
      });

      test('GET /admin/best-profession', async () => {
        await supertest(app)
            .get('/admin/best-profession')
            .expect(200)
            .then((response) => {
                expect(response.body.profession).toBe('Programmer');
              });
      });
});