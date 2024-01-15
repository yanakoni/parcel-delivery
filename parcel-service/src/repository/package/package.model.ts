import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ParcelStatus } from '../../enums';
import { PostOffice } from '../post-office.model';
import { Dimension } from '../dimension.model';
import { Payment } from '../payment.model';
import { Address } from '../address.model';
import { User } from '../user.model';

// Represents a physical package being sent from one location to another
@Schema({ timestamps: true })
class Package {
    @Prop({ type: Types.ObjectId, required: true, ref: 'User' })
    sender: User;

    @Prop({ type: Types.ObjectId, required: true, ref: 'User' })
    receiver: User;

    @Prop({ required: true })
    dimensions: Dimension;

    @Prop({ required: true })
    weight: number;

    @Prop({ type: Types.ObjectId, required: false, ref: 'PostOffice' })
    departurePostOffice?: PostOffice;

    @Prop({ type: Types.ObjectId, required: false, ref: 'PostOffice' })
    destinationPostOffice?: PostOffice;

    @Prop({ required: false })
    departureAddress?: Address;

    @Prop({ required: false })
    destinationAddress?: Address;

    @Prop({ required: true, type: String, enum: ParcelStatus })
    status: ParcelStatus;

    @Prop({ required: true })
    price: number;

    @Prop({ type: Types.ObjectId, required: false, ref: 'Payment' })
    payment?: Payment;

    @Prop({
        required: false,
    })
    estimatedPickUpTime?: Date;

    @Prop({ required: false })
    estimatedDeliveryTime?: Date;

    @Prop({ required: true })
    createdAt: Date;

    // TODO: maybe we should have ability to create a package
    //  and set it to be received at post office at a later date
    @Prop({ required: false })
    receivedAt: Date;

    @Prop({ required: true })
    updatedAt: Date;
}

const PackageSchema = SchemaFactory.createForClass(Package);

type PackageDocument = Package & Document;

export { Package, PackageSchema };
export type { PackageDocument };
