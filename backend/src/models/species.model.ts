import mongoose, { Document, Schema } from 'mongoose';

export interface ISpecies extends Document {
  scientificName: string;
  commonName?: string;
  family?: string;
  genus?: string;
  description?: string;
  habitat?: string;
  distribution?: string;
  behavior?: string;
  venomInfo?: string;
  conservationStatus?: string;
  imageUrls?: string[];
  createdAt: Date;
  updatedAt: Date;
}

const SpeciesSchema = new Schema<ISpecies>(
  {
    scientificName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    commonName: {
      type: String,
      trim: true,
    },
    family: {
      type: String,
      trim: true,
    },
    genus: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
    },
    habitat: {
      type: String,
    },
    distribution: {
      type: String,
    },
    behavior: {
      type: String,
    },
    venomInfo: {
      type: String,
    },
    conservationStatus: {
      type: String,
    },
    imageUrls: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

// Add index for search
SpeciesSchema.index({ scientificName: 'text', commonName: 'text', family: 'text' });

export const SpeciesModel = mongoose.model<ISpecies>('Species', SpeciesSchema);
