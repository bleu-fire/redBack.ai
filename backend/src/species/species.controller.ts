import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { SpeciesService } from './species.service';
import { CreateSpeciesDto } from './dto/create-species.dto';
import { UpdateSpeciesDto } from './dto/update-species.dto';

@Controller('species')
export class SpeciesController {
  constructor(private readonly speciesService: SpeciesService) {}

  @Post()
  async create(@Body() createSpeciesDto: CreateSpeciesDto) {
    return this.speciesService.create(createSpeciesDto);
  }

  @Get()
  async findAll(@Query('search') search?: string) {
    return this.speciesService.findAll(search);
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.speciesService.findById(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateSpeciesDto: UpdateSpeciesDto,
  ) {
    return this.speciesService.update(id, updateSpeciesDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.speciesService.remove(id);
  }
}
