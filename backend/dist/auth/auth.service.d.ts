import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthService {
    private userModel;
    constructor(userModel: Model<UserDocument>);
    register(registerDto: RegisterDto): Promise<User>;
    login(loginDto: LoginDto): Promise<{
        user: Partial<User>;
        message: string;
    }>;
    findByEmail(email: string): Promise<UserDocument | null>;
}
