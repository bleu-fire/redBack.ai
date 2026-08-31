import { Model } from 'mongoose';
import { Identification, IdentificationDocument } from '../schemas/identification.schema';
export declare class IdentificationsService {
    private identificationModel;
    constructor(identificationModel: Model<IdentificationDocument>);
    findAll(): Promise<Identification[]>;
    findById(id: string): Promise<Identification | null>;
}
