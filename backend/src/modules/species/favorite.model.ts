import { Schema, model, Document, Types } from 'mongoose';

export interface IFavorite extends Document {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  speciesId: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const favoriteSchema = new Schema<IFavorite>(
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
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent duplicate favorites for the same user and species
favoriteSchema.index({ userId: 1, speciesId: 1 }, { unique: true });

export const Favorite = model<IFavorite>('Favorite', favoriteSchema);
export default Favorite;
