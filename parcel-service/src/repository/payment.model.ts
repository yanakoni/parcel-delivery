import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { PaymentMethod } from '../enums';
import { User } from './user.model';

// Represents the physical sizes of a package
@Schema({ timestamps: true })
class Payment {
    @Prop({ type: Types.ObjectId, required: true, ref: 'User' })
    user: User;

    @Prop({ required: true, type: String, enum: PaymentMethod })
    paymentMethod: PaymentMethod;

    // TODO: specify the type of the transaction history
    @Prop({ required: true })
    transactionHistory: string[];
}

const PaymentSchema = SchemaFactory.createForClass(Payment);

type PaymentDocument = Payment & Document;

export { Payment, PaymentSchema };
export type { PaymentDocument };
