import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type IdentificationDocument = Identification & Document;

@Schema({ timestamps: true })
export class Identification {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  userId?: string;

  @Prop({ required: true })
  imageUrl: string;

  @Prop({ required: true, default: 'pending' })
  status: string;

  @Prop([
    {
      speciesId: { type: MongooseSchema.Types.ObjectId, ref: 'Species' },
      scientificName: String,
      commonName: String,
      confidence: Number,
      confidenceBand: String,
    },
  ])
  predictions: Array<{
    speciesId?: string;
    scientificName: string;
    commonName?: string;
    confidence: number;
    confidenceBand: string;
  }>;
}

export const IdentificationSchema = SchemaFactory.createForClass(Identification);
