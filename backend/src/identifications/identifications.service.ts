import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Identification, IdentificationDocument } from '../schemas/identification.schema';

@Injectable()
export class IdentificationsService {
  constructor(
    @InjectModel(Identification.name)
    private identificationModel: Model<IdentificationDocument>,
  ) {}

  async findAll(): Promise<Identification[]> {
    return this.identificationModel.find().exec();
  }

  async findById(id: string): Promise<Identification | null> {
    return this.identificationModel.findById(id).exec();
  }
}

