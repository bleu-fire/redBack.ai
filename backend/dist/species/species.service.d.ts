import { Model } from 'mongoose';
import { Species, SpeciesDocument } from '../schemas/species.schema';
import { CreateSpeciesDto } from './dto/create-species.dto';
import { UpdateSpeciesDto } from './dto/update-species.dto';
export declare class SpeciesService {
    private speciesModel;
    constructor(speciesModel: Model<SpeciesDocument>);
    create(createSpeciesDto: CreateSpeciesDto): Promise<Species>;
    findAll(query?: string): Promise<Species[]>;
    findById(id: string): Promise<Species>;
    update(id: string, updateSpeciesDto: UpdateSpeciesDto): Promise<Species>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
