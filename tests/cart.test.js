require('dotenv').config();
const request = require('supertest');
const app = require('../src/index');

let userToken;

beforeAll(async () => {
  const res = await request(app).post('/api/users/login').send({
    email: 'testuser@example.com',
    password: 'user123',
  });
  userToken = res.body.token;
});

describe('Cart Endpoints', () => {
  let productId = 3;
  let quantity = 2;

  it('should add an item to the cart', async () => {
    const res = await request(app)
      .post('/api/carts/addItem')
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        productId: productId,
        quantity: quantity,
      });

    expect(res.statusCode).toEqual(200);
  });

  it('should update an item in the cart', async () => {
    const updatedQuantity = 3;
    const res = await request(app)
      .put('/api/carts/updateItem')
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        productId: productId,
        quantity: updatedQuantity,
      });
    expect(res.statusCode).toEqual(200);
  });
  it('should retrieve the user cart', async () => {
    const res = await request(app)
      .get('/api/carts/')
      .set('Authorization', `Bearer ${userToken}`);

    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });

  it('should calculate the total cost of the cart', async () => {
    const res = await request(app)
      .get('/api/carts/total')
      .set('Authorization', `Bearer ${userToken}`);

    expect(res.statusCode).toEqual(200);
    expect(typeof res.body.total).toBe('number');
  });

  it('should remove an item from the cart', async () => {
    const res = await request(app)
      .delete('/api/carts/removeItem')
      .set('Authorization', `Bearer ${userToken}`)
      .send({ productId: productId });

    expect(res.statusCode).toEqual(200);
  });
});
