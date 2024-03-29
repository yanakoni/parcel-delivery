import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Address } from './address.model';

@Schema({ timestamps: true })
export class PostOffice extends Document {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    address: Address;

    @Prop({ required: true })
    workingHours: string;
}

export type PostOfficeDocument = PostOffice & Document;

export const PostOfficeSchema = SchemaFactory.createForClass(PostOffice);
