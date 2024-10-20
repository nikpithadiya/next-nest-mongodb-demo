import { Schema, Document } from 'mongoose';

export const PhraseSchema = new Schema({
  _id : {type :String },
  phrase: { type: String, required: true },
  status: { type: String, enum: ['active', 'pending', 'spam', 'deleted'], required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  translations: { type: Map, of: String }
});

export interface PhraseDocument extends Document {
  _id: String;
  phrase: string;
  status: string;
  created_at: Date;
  updated_at: Date;
  translations: Map<string, string>;
}
