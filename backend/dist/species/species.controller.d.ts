import { SpeciesService } from './species.service';
export declare class SpeciesController {
    private readonly speciesService;
    constructor(speciesService: SpeciesService);
    getAllSpecies(): Promise<import("../schemas/species.schema").Species[]>;
    getSpeciesById(id: string): Promise<import("../schemas/species.schema").Species>;
}
