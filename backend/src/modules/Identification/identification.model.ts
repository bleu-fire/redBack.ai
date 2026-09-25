import { Document, Schema, model, Types } from 'mongoose';

export interface IPrediction {
  speciesId?: Types.ObjectId;
  scientificName: string;
  commonName?: string;
  confidence: number;
  confidenceBand?: 'high' | 'moderate' | 'low';
  rank?: number;
  vectorSimilarity?: number;
  visualEvidence?: string[];
}

export interface Identify extends Document {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  imageUrl: string;
  status: string;
  uncertaintyLevel: string;
  predictions?: IPrediction[];
  topPrediction?: IPrediction;
  disclaimer?: string;
  notes?: string;
  latitude?: number;
  longitude?: number;
  createdAt: Date;
  updatedAt: Date;
}

const predictionSchema = new Schema<IPrediction>(
  {
    speciesId: {
      type: Schema.Types.ObjectId,
      ref: 'Species',
      required: false,
    },
    scientificName: {
      type: String,
      required: true,
      trim: true,
    },
    commonName: {
      type: String,
      trim: true,
    },
    confidence: {
      type: Number,
      required: true,
      min: 0,
      max: 1,
    },
    confidenceBand: {
      type: String,
      enum: ['high', 'moderate', 'low'],
      default: 'moderate',
    },
    rank: {
      type: Number,
      default: 1,
    },
    vectorSimilarity: {
      type: Number,
      min: 0,
      max: 1,
    },
    visualEvidence: {
      type: [String],
      default: [],
    },
  },
  { _id: false }
);

const identificationSchema = new Schema<Identify>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    imageUrl: {
      type: String,
      required: [true, 'Image URL is required'],
      trim: true,
    },
    status: {
      type: String,
      required: true,
      default: 'completed',
    },
    uncertaintyLevel: {
      type: String,
      required: true,
      default: 'low',
    },
    predictions: {
      type: [predictionSchema],
      default: [],
    },
    topPrediction: {
      type: predictionSchema,
      required: false,
    },
    disclaimer: {
      type: String,
      default:
        'redBack.ai provides educational species identification assistance only. If bitten by a spider or experiencing severe symptoms, seek immediate emergency medical care.',
    },
    notes: {
      type: String,
      trim: true,
    },
    latitude: {
      type: Number,
    },
    longitude: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

export const IdentificationModel = model<Identify>(
  'Identification',
  identificationSchema
);

export default IdentificationModel;
