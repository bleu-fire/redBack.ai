import { Schema, model, Document, Types } from 'mongoose';

export interface IObservation extends Document {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  speciesId?: Types.ObjectId;
  scientificName?: string;
  commonName?: string;
  imageUrl: string;
  latitude?: number;
  longitude?: number;
  locationName?: string;
  habitat?: string;
  notes?: string;
  confidence?: number;
  observationDate: Date;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const observationSchema = new Schema<IObservation>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    speciesId: {
      type: Schema.Types.ObjectId,
      ref: 'Species',
      required: false,
      index: true,
    },
    scientificName: {
      type: String,
      trim: true,
    },
    commonName: {
      type: String,
      trim: true,
    },
    imageUrl: {
      type: String,
      required: true,
      trim: true,
    },
    latitude: {
      type: Number,
      min: -90,
      max: 90,
    },
    longitude: {
      type: Number,
      min: -180,
      max: 180,
    },
    locationName: {
      type: String,
      trim: true,
    },
    habitat: {
      type: String,
      trim: true,
    },
    notes: {
      type: String,
      trim: true,
      maxlength: 1000,
    },
    confidence: {
      type: Number,
      min: 0,
      max: 1,
    },
    observationDate: {
      type: Date,
      default: Date.now,
      index: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// 2dsphere index for geospatial discovery if lat/lng are provided
observationSchema.index({ latitude: 1, longitude: 1 });

export const Observation = model<IObservation>('Observation', observationSchema);
export default Observation;
