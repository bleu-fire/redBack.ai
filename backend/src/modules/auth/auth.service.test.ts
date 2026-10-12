import { authService } from './auth.service';
import { User } from './user.model';
import bcrypt from 'bcryptjs';

describe('AuthService', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('login() should reject empty credentials', async () => {
    await expect(authService.login({ email: '', password: '' })).rejects.toThrow(
      'Please provide email and password'
    );
  });

  it('login() should reject non-existing user', async () => {
    jest.spyOn(User, 'findOne').mockReturnValue({
      select: jest.fn().mockResolvedValue(null),
    } as any);

    await expect(authService.login({ email: 'ghost@test.com', password: '123' })).rejects.toThrow(
      'Email or password is wrong'
    );
  });

  it('login() should reject wrong password', async () => {
    jest.spyOn(User, 'findOne').mockReturnValue({
      select: jest.fn().mockResolvedValue({
        _id: 'user_123',
        email: 'karim@redback.ai',
        password: 'hashed_password',
      }),
    } as any);
    jest.spyOn(bcrypt, 'compare').mockImplementation(async () => false);

    await expect(authService.login({ email: 'karim@redback.ai', password: 'wrong' })).rejects.toThrow(
      'Email or password is wrong'
    );
  });

  it('login() should return token & user profile on valid credentials', async () => {
    jest.spyOn(User, 'findOne').mockReturnValue({
      select: jest.fn().mockResolvedValue({
        _id: 'user_123',
        name: 'Karim Explorer',
        email: 'karim@redback.ai',
        role: 'user',
        password: 'hashed_password',
      }),
    } as any);
    jest.spyOn(bcrypt, 'compare').mockImplementation(async () => true);

    const res = await authService.login({
      email: 'karim@redback.ai',
      password: 'correct_password',
    });

    expect(res.token).toBeDefined();
    expect(res.user.email).toBe('karim@redback.ai');
    expect(res.user.name).toBe('Karim Explorer');
  });

  it('register() should reject already registered email', async () => {
    jest.spyOn(User, 'findOne').mockResolvedValue({ _id: 'existing_id' } as any);

    await expect(
      authService.register({
        name: 'Sara',
        email: 'sara@redback.ai',
        password: 'pass',
      })
    ).rejects.toThrow('Email already in use');
  });
});
