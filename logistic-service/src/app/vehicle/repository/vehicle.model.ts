import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Vehicle {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    type: string;

    @Prop({ required: true })
    manufacturer: string;

    @Prop({ required: true })
    capacity: number;
}

export type VehicleDocument = Vehicle & Document;

export const VehicleSchema = SchemaFactory.createForClass(Vehicle);
