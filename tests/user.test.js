const request = require('supertest');
const app = require('../src/index');
const userService = require('../src/services/userService');
const db = require('../src/config/dbConfig');

jest.mock('../src/services/userService');
jest.mock('../src/config/dbConfig');

beforeEach(() => {
  jest.clearAllMocks();
});

describe('User Registration', () => {
  it('should register a new user successfully', async () => {
    const userData = {
      nombre: 'Test User',
      apellido: 'Test Apellido',
      email: 'test@example.com',
      password: 'password123',
      id_cred: 'test_role_id',
    };

    userService.registerNewUser.mockResolvedValue(userData);
    const response = await request(app)
      .post('/api/users/registro')
      .send(userData);

    expect(response.statusCode).toBe(201);
    expect(response.body.user).toBeDefined();
    expect(userService.registerNewUser).toHaveBeenCalledWith(userData);
  });
});

describe('User Login', () => {
  it('should login user successfully', async () => {
    const loginData = { email: 'test@example.com', password: 'password123' };
    const token = 'fakeToken';

    userService.authenticateUser.mockResolvedValue({ user: loginData, token });
    const response = await request(app)
      .post('/api/users/login')
      .send(loginData);

    expect(response.statusCode).toBe(200);
    expect(response.body.token).toBeDefined();
    expect(userService.authenticateUser).toHaveBeenCalledWith(
      loginData.email,
      loginData.password
    );
  });
});

describe('Change Password', () => {
  it('should change the password successfully', async () => {
    const passwordData = {
      userId: 1,
      oldPassword: 'password123',
      newPassword: 'newPassword123',
    };
    userService.changeUserPassword.mockResolvedValue({
      success: true,
      message: 'Password updated successfully',
    });

    const response = await request(app)
      .post('/api/users/changePassword')
      .send(passwordData)
      .set('Authorization', `Bearer fakeToken`);

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Password updated successfully');
    expect(userService.changeUserPassword).toHaveBeenCalledWith(
      passwordData.userId,
      passwordData.oldPassword,
      passwordData.newPassword
    );
  });
});
