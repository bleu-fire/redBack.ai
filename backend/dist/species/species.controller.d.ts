import { SpeciesService } from './species.service';
import { CreateSpeciesDto } from './dto/create-species.dto';
import { UpdateSpeciesDto } from './dto/update-species.dto';
export declare class SpeciesController {
    private readonly speciesService;
    constructor(speciesService: SpeciesService);
    create(createSpeciesDto: CreateSpeciesDto): Promise<import("../schemas/species.schema").Species>;
    findAll(search?: string): Promise<import("../schemas/species.schema").Species[]>;
    findById(id: string): Promise<import("../schemas/species.schema").Species>;
    update(id: string, updateSpeciesDto: UpdateSpeciesDto): Promise<import("../schemas/species.schema").Species>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
