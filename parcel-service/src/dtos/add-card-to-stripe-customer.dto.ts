import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddCardToStripeCustomerDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    cardToken: string;
}
