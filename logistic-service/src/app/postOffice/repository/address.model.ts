import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// Represents an address of a user
@Schema({ timestamps: true })
class Address {
    // TODO: limit to a list of countries
    @Prop({ required: true })
    country: string;

    @Prop({ required: true })
    city: string;

    @Prop({ required: false })
    street: string;

    @Prop({ required: false })
    zipCode: string;

    @Prop({ required: false })
    note?: string;
}

const AddressSchema = SchemaFactory.createForClass(Address);

type AddressDocument = Address & Document;

export { Address, AddressSchema };
export type { AddressDocument };
