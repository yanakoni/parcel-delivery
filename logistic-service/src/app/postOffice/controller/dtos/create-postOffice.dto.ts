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
    state: string;

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
    tel: string;
}

export class CreatePostOfficeDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    name: string;

    @IsNotEmpty()
    @ApiProperty({ type: AddressDto })
    address: AddressDto;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ type: String })
    workingHours: string;
}
