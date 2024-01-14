import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class StripeCustomerChargeDto {
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    amount: number;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    currency: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    description: string;
}
