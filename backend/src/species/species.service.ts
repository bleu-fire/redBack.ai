import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Species, SpeciesDocument } from '../schemas/species.schema';
import { CreateSpeciesDto } from './dto/create-species.dto';
import { UpdateSpeciesDto } from './dto/update-species.dto';

@Injectable()
export class SpeciesService {
  constructor(
    @InjectModel(Species.name) private speciesModel: Model<SpeciesDocument>,
  ) {}

  async create(createSpeciesDto: CreateSpeciesDto): Promise<Species> {
    const createdSpecies = new this.speciesModel(createSpeciesDto);
    return createdSpecies.save();
  }

  async findAll(query?: string): Promise<Species[]> {
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

  async findById(id: string): Promise<Species> {
    const species = await this.speciesModel.findById(id).exec();
    if (!species) {
      throw new NotFoundException(`Species with ID ${id} not found`);
    }
    return species;
  }

  async update(id: string, updateSpeciesDto: UpdateSpeciesDto): Promise<Species> {
    const updated = await this.speciesModel
      .findByIdAndUpdate(id, updateSpeciesDto, { new: true })
      .exec();
    if (!updated) {
      throw new NotFoundException(`Species with ID ${id} not found`);
    }
    return updated;
  }

  async remove(id: string): Promise<{ message: string }> {
    const deleted = await this.speciesModel.findByIdAndDelete(id).exec();
    if (!deleted) {
      throw new NotFoundException(`Species with ID ${id} not found`);
    }
    return { message: `Species with ID ${id} successfully deleted` };
  }
}
