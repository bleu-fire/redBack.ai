import { Schema, model, Document } from 'mongoose';

export interface ISpecies extends Document {
  scientificName: string;
  commonName: string;
  family: string;
  genus: string;
  description?: string;
  habitat: string;
  distribution: string;
  behavior: string;
  venomInfo: string;
  conservationStatus?: string;
  imageUrls: string[];
  createdAt: Date;
  updatedAt: Date;
}

const speciesSchema = new Schema<ISpecies>(
  {
    scientificName: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    commonName: {
      type: String,
      required: true,
      trim: true,
    },
    family: {
      type: String,
      required: true,
      trim: true,
    },
    genus: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: false,
    },
    habitat: {
      type: String,
      required: true,
    },
    distribution: {
      type: String,
      required: true,
    },
    behavior: {
      type: String,
      required: true,
    },
    venomInfo: {
      type: String,
      required: true,
    },
    conservationStatus: {
      type: String,
      required: true,
    },
    imageUrls: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Species = model<ISpecies>('Species', speciesSchema);
export default Species;

