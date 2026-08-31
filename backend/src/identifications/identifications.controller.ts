import { Controller, Get, Param } from '@nestjs/common';
import { IdentificationsService } from './identifications.service';

@Controller('identifications')
export class IdentificationsController {
  constructor(private readonly identificationsService: IdentificationsService) {}

  @Get()
  async getAllIdentifications() {
    return this.identificationsService.findAll();
  }

  @Get(':id')
  async getIdentificationById(@Param('id') id: string) {
    return this.identificationsService.findById(id);
  }
}

