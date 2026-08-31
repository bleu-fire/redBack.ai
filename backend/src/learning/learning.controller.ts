import { Controller, Get, Param } from '@nestjs/common';
import { LearningService } from './learning.service';

@Controller('learning')
export class LearningController {
  constructor(private readonly learningService: LearningService) {}

  @Get()
  async getAllTopics() {
    return this.learningService.findAll();
  }

  @Get(':slug')
  async getTopicBySlug(@Param('slug') slug: string) {
    return this.learningService.findBySlug(slug);
  }
}

