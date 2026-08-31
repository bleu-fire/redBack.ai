import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(registerDto: RegisterDto): Promise<import("../schemas/user.schema").User>;
    login(loginDto: LoginDto): Promise<{
        user: Partial<import("../schemas/user.schema").User>;
        message: string;
    }>;
    getStatus(): {
        status: string;
    };
}
