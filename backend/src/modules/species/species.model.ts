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
  toxicityLevel?: 'harmless' | 'mild' | 'moderate' | 'danger' | 'deadly';
  firstAid?: string;
  morphology?: {
    eyePattern?: string;
    bodyLengthMm?: string;
    colors?: string[];
    keyFeatures?: string[];
  };
  vectorId?: string;
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
    toxicityLevel: {
      type: String,
      enum: ['harmless', 'mild', 'moderate', 'danger', 'deadly'],
      default: 'harmless',
    },
    firstAid: {
      type: String,
      required: false,
    },
    morphology: {
      eyePattern: { type: String },
      bodyLengthMm: { type: String },
      colors: { type: [String], default: [] },
      keyFeatures: { type: [String], default: [] },
    },
    vectorId: {
      type: String,
      required: false,
    },
    conservationStatus: {
      type: String,
      required: false,
      default: 'Least Concern',
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

