import mongoose, { Document, Schema } from 'mongoose';

export interface ILearningTopic extends Document {
  slug: string;
  title: string;
  content: string;
  category?: string;
  sourceUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

const LearningTopicSchema = new Schema<ILearningTopic>(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
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
      trim: true,
    },
    sourceUrl: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

export const LearningTopicModel = mongoose.model<ILearningTopic>('LearningTopic', LearningTopicSchema);
