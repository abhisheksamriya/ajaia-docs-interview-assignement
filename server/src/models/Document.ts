import mongoose, { Schema, Document } from 'mongoose';

export interface IDocument extends Document {
  title: string;
  content: string;
  ownerId: string;
  sharedWith: string[];
  createdAt: Date;
  updatedAt: Date;
}

const DocumentSchema: Schema = new Schema({
  title: { type: String, required: true, default: 'Untitled Document' },
  content: { type: String, default: '' },
  ownerId: { type: String, required: true },
  sharedWith: { type: [String], default: [] }
}, { timestamps: true });

export const DocumentModel = mongoose.model<IDocument>('Document', DocumentSchema);