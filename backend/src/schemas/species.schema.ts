import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SpeciesDocument = Species & Document;

@Schema({ timestamps: true })
export class Species {
  @Prop({ required: true, unique: true })
  scientificName: string;

  @Prop()
  commonName?: string;

  @Prop()
  family?: string;

  @Prop()
  genus?: string;

  @Prop()
  description?: string;

  @Prop()
  habitat?: string;

  @Prop()
  distribution?: string;

  @Prop()
  behavior?: string;

  @Prop()
  venomInfo?: string;

  @Prop()
  conservationStatus?: string;

  @Prop([String])
  imageUrls?: string[];
}

export const SpeciesSchema = SchemaFactory.createForClass(Species);
