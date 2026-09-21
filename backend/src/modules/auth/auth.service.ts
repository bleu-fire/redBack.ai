import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { User, IUser } from './user.model';
import { config } from '../../config/env';
import { AppError } from '../../middlewares/error.middleware';

export interface RegisterDTO {
  name: string;
  email: string;
  password: string;
}

export interface LoginDTO {
  email: string;
  password: string;
}

export interface AuthResult {
  token: string;
  user: {
    id: any;
    name: string;
    email: string;
    role: string;
  };
}

class AuthService {
  // JWT Token
  private signToken(id: string): string {
    return jwt.sign({ id }, config.jwtSecret, {
      expiresIn: config.jwtExpiresIn as any,
    });
  }
//new user resgister
  async register(data: RegisterDTO): Promise<AuthResult> {
    const { name, email, password } = data;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new AppError('Email already in use', 400);
    }

    const salt = await bcrypt.genSalt(8);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = this.signToken(newUser._id.toString());

    return {
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    };
  }

  // 2. login
  async login(data: LoginDTO): Promise<AuthResult> {
    const { email, password } = data;

    if (!email || !password) {
      throw new AppError('Please provide email and password', 400);
    }

    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new AppError('Email or password is wrong', 401);
    }

    const token = this.signToken(user._id.toString());

    return {
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }

 // Get all users data 
  async getAllUsers(): Promise<IUser[]> {
    return await User.find().select('-password');
  }
}

export const authService = new AuthService();
export default authService;

