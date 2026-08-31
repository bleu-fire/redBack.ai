import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SpeciesController } from './species.controller';
import { SpeciesService } from './species.service';
import { Species, SpeciesSchema } from '../schemas/species.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Species.name, schema: SpeciesSchema }]),
  ],
  controllers: [SpeciesController],
  providers: [SpeciesService],
  exports: [SpeciesService],
})
export class SpeciesModule {}

