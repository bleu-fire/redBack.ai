import { IdentificationsService } from './identifications.service';
export declare class IdentificationsController {
    private readonly identificationsService;
    constructor(identificationsService: IdentificationsService);
    getAllIdentifications(): Promise<import("../schemas/identification.schema").Identification[]>;
    getIdentificationById(id: string): Promise<import("../schemas/identification.schema").Identification>;
}
