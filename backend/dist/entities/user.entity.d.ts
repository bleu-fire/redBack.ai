import { Identification } from './identification.entity';
export declare class User {
    id: string;
    fullname: string;
    email: string;
    passwordHash: string;
    createdAt: Date;
    updatedAt: Date;
    identifications: Identification[];
}
