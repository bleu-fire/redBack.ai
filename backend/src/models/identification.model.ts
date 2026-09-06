import mongoose, { Document, Schema } from 'mongoose';

export interface IPrediction {
  speciesId?: mongoose.Types.ObjectId | string;
  scientificName: string;
  commonName?: string;
  confidence: number;
  confidenceBand: 'high' | 'medium' | 'low';
}

export interface IIdentification extends Document {
  userId?: mongoose.Types.ObjectId | string;
  imageUrl: string;
  status: 'pending' | 'completed' | 'failed';
  predictions: IPrediction[];
  createdAt: Date;
  updatedAt: Date;
}

const PredictionSchema = new Schema<IPrediction>(
  {
    speciesId: {
      type: Schema.Types.ObjectId,
      ref: 'Species',
    },
    scientificName: {
      type: String,
      required: true,
    },
    commonName: {
      type: String,
    },
    confidence: {
      type: Number,
      required: true,
    },
    confidenceBand: {
      type: String,
      enum: ['high', 'medium', 'low'],
      default: 'medium',
    },
  },
  { _id: false },
);

const IdentificationSchema = new Schema<IIdentification>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    imageUrl: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed'],
      default: 'pending',
    },
    predictions: {
      type: [PredictionSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

export const IdentificationModel = mongoose.model<IIdentification>('Identification', IdentificationSchema);
