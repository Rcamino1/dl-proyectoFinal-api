require('dotenv').config();
const request = require('supertest');
const app = require('../src/index');

let adminToken;

beforeAll(async () => {
  const res = await request(app).post('/api/users/login').send({
    email: 'adminuser@example.com',
    password: 'admin123',
  });
  adminToken = res.body.token;
});

describe('User Endpoints', () => {
  it('should login an admin user', async () => {
    const res = await request(app).post('/api/users/login').send({
      email: 'adminuser@example.com',
      password: 'admin123',
    });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
  });
});

describe('Product Endpoints', () => {
  it('should create a new product', async () => {
    const res = await request(app)
      .post('/api/products')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        nombre: 'Nuevo Producto Test',
        precio: 9.99,
        img_url: 'http://ejemplo.com/product.jpg',
        descripcion: 'Nuevo Producto Test',
        detalle: 'Nuevo Producto Test Detalle',
      });
    console.log(res.headers);
    expect(res.statusCode).toEqual(201);
  });

  it('should update a product', async () => {
    const res = await request(app)
      .put('/api/products/1')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        nombre: 'Update Producto Test',
        precio: 10.99,
        img_url: 'http://ejemplo.com/product-updated.jpg',
        descripcion: 'Update Producto Test',
        detalle: 'Update Producto Test Detalle',
      });
    console.log(res.headers);
    expect(res.statusCode).toEqual(200);
  });

  it('should delete a product', async () => {
    const res = await request(app)
      .delete('/api/products/1')
      .set('Authorization', `Bearer ${adminToken}`);

    expect(res.statusCode).toEqual(200);
  });

  it('should retrieve all products', async () => {
    const res = await request(app).get('/api/products');

    expect(res.statusCode).toEqual(200);
  });
});
