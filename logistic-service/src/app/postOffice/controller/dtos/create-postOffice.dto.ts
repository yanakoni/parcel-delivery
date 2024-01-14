// create-post-office.dto.ts

import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddressDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    country: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    city: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    street: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    zipCode: string;
}

export class CreatePostOfficeDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    name: string;

    // @IsObj()
    @IsNotEmpty()
    @ApiProperty({ type: AddressDto })
    address: AddressDto;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    contactNumber: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ type: String })
    workingHours: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ type: String })
    servicesOffered: string;
}
