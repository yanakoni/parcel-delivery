import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// Represents the physical sizes of a package
@Schema({ timestamps: true })
class Dimension {
    @Prop({ required: true })
    length: number;

    @Prop({ required: true })
    width: number;

    @Prop({ required: true })
    height: number;
}

const DimensionSchema = SchemaFactory.createForClass(Dimension);

type DimensionDocument = Dimension & Document;

export { Dimension, DimensionSchema };
export type { DimensionDocument };
