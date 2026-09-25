import { Schema, model, Document, Types } from 'mongoose';

export interface IQuizQuestion {
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface IQuiz extends Document {
  _id: Types.ObjectId;
  topicId?: Types.ObjectId;
  title: string;
  description?: string;
  difficulty: 'beginner' | 'intermediate' | 'expert';
  xpReward: number;
  questions: IQuizQuestion[];
  passingScore: number; // percentage, e.g. 70
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const quizQuestionSchema = new Schema<IQuizQuestion>(
  {
    question: {
      type: String,
      required: true,
      trim: true,
    },
    options: {
      type: [String],
      required: true,
      validate: [
        (val: string[]) => val.length >= 2,
        'A quiz question must have at least 2 options',
      ],
    },
    correctAnswerIndex: {
      type: Number,
      required: true,
      min: 0,
    },
    explanation: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { _id: false }
);

const quizSchema = new Schema<IQuiz>(
  {
    topicId: {
      type: Schema.Types.ObjectId,
      ref: 'LearningTopic',
      required: false,
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    difficulty: {
      type: String,
      enum: ['beginner', 'intermediate', 'expert'],
      default: 'beginner',
    },
    xpReward: {
      type: Number,
      default: 100,
    },
    questions: {
      type: [quizQuestionSchema],
      required: true,
      validate: [
        (val: IQuizQuestion[]) => val.length > 0,
        'A quiz must contain at least 1 question',
      ],
    },
    passingScore: {
      type: Number,
      default: 70,
      min: 0,
      max: 100,
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

export const Quiz = model<IQuiz>('Quiz', quizSchema);
export default Quiz;
