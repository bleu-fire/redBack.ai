import { Controller, Get, Param } from '@nestjs/common';
import { SpeciesService } from './species.service';

@Controller('species')
export class SpeciesController {
  constructor(private readonly speciesService: SpeciesService) {}

  @Get()
  async getAllSpecies() {
    return this.speciesService.findAll();
  }

  @Get(':id')
  async getSpeciesById(@Param('id') id: string) {
    return this.speciesService.findById(id);
  }
}

