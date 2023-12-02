import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Address } from './address.model';

// Represents an address of a user
@Schema({ timestamps: true })
class PostOffice {
    @Prop({ required: true })
    location: Address;

    @Prop({ required: true })
    services: string[];

    @Prop({ required: true })
    operatingHours: string;
}

const PostOfficeSchema = SchemaFactory.createForClass(PostOffice);

type PostOfficeDocument = PostOffice & Document;

export { PostOffice, PostOfficeSchema };
export type { PostOfficeDocument };
