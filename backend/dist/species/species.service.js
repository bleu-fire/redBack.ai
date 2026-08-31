"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpeciesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const species_schema_1 = require("../schemas/species.schema");
let SpeciesService = class SpeciesService {
    constructor(speciesModel) {
        this.speciesModel = speciesModel;
    }
    async create(createSpeciesDto) {
        const createdSpecies = new this.speciesModel(createSpeciesDto);
        return createdSpecies.save();
    }
    async findAll(query) {
        if (query) {
            return this.speciesModel.find({
                $or: [
                    { scientificName: { $regex: query, $options: 'i' } },
                    { commonName: { $regex: query, $options: 'i' } },
                    { family: { $regex: query, $options: 'i' } },
                ],
            }).exec();
        }
        return this.speciesModel.find().exec();
    }
    async findById(id) {
        const species = await this.speciesModel.findById(id).exec();
        if (!species) {
            throw new common_1.NotFoundException(`Species with ID ${id} not found`);
        }
        return species;
    }
    async update(id, updateSpeciesDto) {
        const updated = await this.speciesModel
            .findByIdAndUpdate(id, updateSpeciesDto, { new: true })
            .exec();
        if (!updated) {
            throw new common_1.NotFoundException(`Species with ID ${id} not found`);
        }
        return updated;
    }
    async remove(id) {
        const deleted = await this.speciesModel.findByIdAndDelete(id).exec();
        if (!deleted) {
            throw new common_1.NotFoundException(`Species with ID ${id} not found`);
        }
        return { message: `Species with ID ${id} successfully deleted` };
    }
};
exports.SpeciesService = SpeciesService;
exports.SpeciesService = SpeciesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(species_schema_1.Species.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], SpeciesService);
//# sourceMappingURL=species.service.js.map