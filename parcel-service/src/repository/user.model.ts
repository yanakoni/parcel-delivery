import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Address } from './address.model';

class PaymentInformation {
    @Prop({ required: true })
    currency: string;

    @Prop({ required: true })
    preferredLocales: string[];

    @Prop({ required: true })
    sources: any;

    @Prop({ required: true })
    ip: string;

    @Prop({ required: true })
    metadata: any;

    @Prop({ required: true })
    card: {
        brand: string;
        expDate: string;
        last4: string;
    };
}

// Represents a user
@Schema({ timestamps: true })
class User {
    @Prop({ required: true })
    username: string;

    @Prop({ required: true, minlength: 16 })
    password: string;

    @Prop({ required: true, maxlength: 255 })
    email: string;

    // TODO
    @Prop({ required: true })
    profileInformation: any;

    // TODO ???
    @Prop({ required: true })
    deliveryAddresses: Address[];

    // TODO ???
    @Prop({ required: true })
    favouriteAddresses: Address[];

    // TODO
    @Prop({ required: true })
    paymentInformation: PaymentInformation;

    // TODO
    @Prop({ required: true })
    preferences: any;

    // TODO
    @Prop({ required: false })
    stripeId: string;
}

const UserSchema = SchemaFactory.createForClass(User);

type UserDocument = User & Document;

export { User, UserSchema };
export type { UserDocument };
