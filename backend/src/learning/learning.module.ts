import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LearningController } from './learning.controller';
import { LearningService } from './learning.service';
import { LearningTopic, LearningTopicSchema } from '../schemas/learning-topic.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: LearningTopic.name, schema: LearningTopicSchema },
    ]),
  ],
  controllers: [LearningController],
  providers: [LearningService],
  exports: [LearningService],
})
export class LearningModule {}

