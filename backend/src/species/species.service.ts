import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Species, SpeciesDocument } from '../schemas/species.schema';

@Injectable()
export class SpeciesService {
  constructor(
    @InjectModel(Species.name) private speciesModel: Model<SpeciesDocument>,
  ) {}

  async findAll(): Promise<Species[]> {
    return this.speciesModel.find().exec();
  }

  async findById(id: string): Promise<Species | null> {
    return this.speciesModel.findById(id).exec();
  }
}

