import { Schema, model, Document, Types } from 'mongoose';

export interface ILearningTopic extends Document {
  _id: Types.ObjectId;
  slug: string;
  title: string;
  content: string;
  category: 'anatomy' | 'behavior' | 'bite-safety' | 'biodiversity' | 'general';
  summary?: string;
  estimatedReadTime: number; // in minutes
  xpReward: number;
  sourceUrl?: string;
  imageUrls: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const learningTopicSchema = new Schema<ILearningTopic>(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ['anatomy', 'behavior', 'bite-safety', 'biodiversity', 'general'],
      default: 'general',
      index: true,
    },
    summary: {
      type: String,
      trim: true,
    },
    estimatedReadTime: {
      type: Number,
      default: 5,
    },
    xpReward: {
      type: Number,
      default: 50,
    },
    sourceUrl: {
      type: String,
      trim: true,
    },
    imageUrls: {
      type: [String],
      default: [],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export const LearningTopic = model<ILearningTopic>('LearningTopic', learningTopicSchema);
export default LearningTopic;
