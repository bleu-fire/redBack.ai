import { Model } from 'mongoose';
import { UserDocument } from '../schemas/user.schema';
export declare class AuthService {
    private userModel;
    constructor(userModel: Model<UserDocument>);
    findByEmail(email: string): Promise<UserDocument | null>;
}
