import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import Stripe from 'stripe';
import { User } from '../user';

// Represents a payment
@Schema({ timestamps: true })
class Payment {
    @Prop({ type: Types.ObjectId, required: true, ref: 'User' })
    userId: User;

    @Prop({ required: true, minlength: 4 })
    cardNumber: string;

    @Prop({ required: true })
    amount: number;

    @Prop({ required: true })
    datePurchase: Date;

    @Prop({ required: true })
    status: Stripe.Charge.Status;
}

const PaymentSchema = SchemaFactory.createForClass(Payment);

type PaymentDocument = Payment & Document;

export { Payment, PaymentSchema };
export type { PaymentDocument };
