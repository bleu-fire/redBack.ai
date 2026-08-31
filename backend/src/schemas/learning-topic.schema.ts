import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type LearningTopicDocument = LearningTopic & Document;

@Schema({ timestamps: true })
export class LearningTopic {
  @Prop({ required: true, unique: true })
  slug: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string;

  @Prop()
  category?: string;

  @Prop()
  sourceUrl?: string;
}

export const LearningTopicSchema = SchemaFactory.createForClass(LearningTopic);
