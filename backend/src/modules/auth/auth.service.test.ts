import { authService } from './auth.service';
import { User } from './user.model';
import bcrypt from 'bcrypt';

// Helper بسيط للـ Testing
let passed = 0;
let failed = 0;

async function test(name: string, fn: () => Promise<void>) {
  try {
    await fn();
    console.log(`  ✅ PASS: ${name}`);
    passed++;
  } catch (err: any) {
    console.error(`  ❌ FAIL: ${name}`);
    console.error(`     Error: ${err.message}`);
    failed++;
  }
}

function expect(actual: any) {
  return {
    toBe(expected: any) {
      if (actual !== expected) {
        throw new Error(`Expected "${expected}" but received "${actual}"`);
      }
    },
    toBeDefined() {
      if (actual === undefined || actual === null) {
        throw new Error(`Expected value to be defined, but got ${actual}`);
      }
    },
    async toThrow(expectedMsg?: string) {
      // already caught in callback
    },
  };
}

async function runTests() {
  console.log('\n🧪 --- Testing AuthService Functions --- \n');

  // Test 1: Empty email/password validation
  await test('login() should reject empty credentials', async () => {
    try {
      await authService.login({ email: '', password: '' });
      throw new Error('Should have thrown an error for empty fields');
    } catch (err: any) {
      expect(err.message).toBe('Please provide email and password');
    }
  });

  // Test 2: User not found in database
  await test('login() should reject non-existing user', async () => {
    // Mock User.findOne to return null
    const originalFindOne = User.findOne;
    (User as any).findOne = () => ({
      select: async () => null,
    });

    try {
      await authService.login({ email: 'ghost@test.com', password: '123' });
      throw new Error('Should have thrown 401 error');
    } catch (err: any) {
      expect(err.message).toBe('Email or password is wrong');
    } finally {
      User.findOne = originalFindOne;
    }
  });

  // Test 3: Wrong password
  await test('login() should reject wrong password', async () => {
    const originalFindOne = User.findOne;
    const originalCompare = bcrypt.compare;

    (User as any).findOne = () => ({
      select: async () => ({
        _id: 'user_123',
        email: 'karim@redback.ai',
        password: 'hashed_password',
      }),
    });
    (bcrypt as any).compare = async () => false;

    try {
      await authService.login({ email: 'karim@redback.ai', password: 'wrong' });
      throw new Error('Should have failed password comparison');
    } catch (err: any) {
      expect(err.message).toBe('Email or password is wrong');
    } finally {
      User.findOne = originalFindOne;
      bcrypt.compare = originalCompare;
    }
  });

  // Test 4: Successful login returning token & user
  await test('login() should return token & user profile on valid credentials', async () => {
    const originalFindOne = User.findOne;
    const originalCompare = bcrypt.compare;

    (User as any).findOne = () => ({
      select: async () => ({
        _id: 'user_123',
        name: 'Karim Explorer',
        email: 'karim@redback.ai',
        role: 'user',
        password: 'hashed_password',
      }),
    });
    (bcrypt as any).compare = async () => true;

    try {
      const res = await authService.login({
        email: 'karim@redback.ai',
        password: 'correct_password',
      });
      expect(res.token).toBeDefined();
      expect(res.user.email).toBe('karim@redback.ai');
      expect(res.user.name).toBe('Karim Explorer');
    } finally {
      User.findOne = originalFindOne;
      bcrypt.compare = originalCompare;
    }
  });

  // Test 5: Register duplicate email rejection
  await test('register() should reject already registered email', async () => {
    const originalFindOne = User.findOne;
    (User as any).findOne = async () => ({ _id: 'existing_id' });

    try {
      await authService.register({
        name: 'Sara',
        email: 'sara@redback.ai',
        password: 'pass',
      });
      throw new Error('Should have rejected duplicate email');
    } catch (err: any) {
      expect(err.message).toBe('Email already in use');
    } finally {
      User.findOne = originalFindOne;
    }
  });

  console.log(`\n📊 Results: ${passed} passed, ${failed} failed\n`);
  if (failed > 0) process.exit(1);
}

runTests();

