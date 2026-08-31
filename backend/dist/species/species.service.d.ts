import { Model } from 'mongoose';
import { Species, SpeciesDocument } from '../schemas/species.schema';
export declare class SpeciesService {
    private speciesModel;
    constructor(speciesModel: Model<SpeciesDocument>);
    findAll(): Promise<Species[]>;
    findById(id: string): Promise<Species | null>;
}
