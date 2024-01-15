import { ApiProperty } from '@nestjs/swagger';
import Stripe from 'stripe';
import {
    IsArray,
    IsBoolean,
    IsNumber,
    IsString,
    MaxLength,
    MinLength,
} from 'class-validator';

export class CreateStripeCustomerDto {
    @ApiProperty()
    address: Stripe.Emptyable<Stripe.AddressParam>;

    @IsNumber()
    @ApiProperty()
    balance: number;

    @ApiProperty()
    dimensions: any;

    @IsString()
    @ApiProperty()
    coupon?: string;

    @IsString()
    @ApiProperty()
    description?: string;

    @IsString()
    @ApiProperty()
    @MaxLength(512)
    email?: string;

    @ApiProperty()
    expand?: any;

    @IsString()
    @ApiProperty()
    @MinLength(3)
    @MaxLength(12)
    invoice_prefix?: string;

    @ApiProperty()
    invoice_settings?: any;

    @ApiProperty()
    metadata?: Stripe.Emptyable<Stripe.MetadataParam>;

    @IsString()
    @ApiProperty()
    name?: string;

    @IsNumber()
    @ApiProperty()
    next_invoice_sequence?: number;

    @IsString()
    @ApiProperty()
    payment_method?: string;

    @IsString()
    @ApiProperty()
    phone?: string;

    @IsArray()
    @ApiProperty()
    preferred_locales?: Array<string>;

    @IsString()
    @ApiProperty()
    promotion_code?: string;

    @ApiProperty()
    shipping?: Stripe.Emptyable<any>;

    @IsString()
    @ApiProperty()
    source?: string;

    @ApiProperty()
    tax?: any;

    @ApiProperty()
    tax_exempt?: Stripe.Emptyable<any>;

    @IsArray()
    @ApiProperty()
    tax_id_data?: Array<any>;

    @IsString()
    @ApiProperty()
    test_clock?: string;

    @IsBoolean()
    @ApiProperty()
    validate?: boolean;
}
