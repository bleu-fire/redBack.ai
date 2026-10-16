import mongoose, { Document, Schema } from 'mongoose';
import { SourceReference } from './ai.types';

export interface IConversationMessage {
  role: 'user' | 'assistant';
  content: string;
  sources?: SourceReference[];
  timestamp: Date;
}

export interface IConversation extends Document {
  userId: mongoose.Types.ObjectId;
  title: string;
  speciesContext?: {
    name?: string;
    scientific?: string;
    family?: string;
  };
  messages: IConversationMessage[];
  createdAt: Date;
  updatedAt: Date;
}

const ConversationMessageSchema = new Schema<IConversationMessage>(
  {
    role: {
      type: String,
      enum: ['user', 'assistant'],
      required: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    sources: {
      type: [Schema.Types.Mixed],
      default: [],
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false }
);

const ConversationSchema = new Schema<IConversation>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      default: 'Field Observation Discussion',
    },
    speciesContext: {
      name: { type: String, trim: true },
      scientific: { type: String, trim: true },
      family: { type: String, trim: true },
    },
    messages: {
      type: [ConversationMessageSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

ConversationSchema.index({ userId: 1, updatedAt: -1 });

export const Conversation = mongoose.model<IConversation>('Conversation', ConversationSchema);
export default Conversation;
