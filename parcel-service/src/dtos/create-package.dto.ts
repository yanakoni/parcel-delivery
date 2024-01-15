import { ApiProperty } from '@nestjs/swagger';
import {
    IsDateString,
    IsEnum,
    IsNotEmpty,
    IsNumber,
    IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ParcelStatus } from '../enums';

class DimensionDto {
    @IsNotEmpty()
    @ApiProperty()
    length: number;

    @IsNotEmpty()
    @ApiProperty()
    width: number;

    @IsNotEmpty()
    @ApiProperty()
    height: number;
}

class AddressDto {
    @IsNotEmpty()
    @ApiProperty()
    country: string;

    @IsNotEmpty()
    @ApiProperty()
    state: string;

    @IsNotEmpty()
    @ApiProperty()
    city: string;

    @IsNotEmpty()
    @ApiProperty()
    street: string;

    @IsNotEmpty()
    @ApiProperty()
    tel: string;

    @IsNotEmpty()
    @ApiProperty()
    note: string;
}

export class CreatePackageDto {
    // @Transform(({ obj: { _id } }) => _id.toString())
    @IsNotEmpty()
    @ApiProperty()
    sender: string;

    // @Transform(({ obj: { _id } }) => _id.toString())
    @IsNotEmpty()
    @ApiProperty()
    receiver: string;

    @Type(() => DimensionDto)
    @IsNotEmpty()
    @ApiProperty()
    dimensions: DimensionDto;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    weight: number;

    @IsOptional()
    // @Transform(({ obj: { _id } }) => _id?.toString())
    @ApiProperty()
    departurePostOffice?: string;

    @IsOptional()
    // @Transform(({ obj: { _id } }) => _id?.toString())
    @ApiProperty()
    destinationPostOffice?: string;

    @IsOptional()
    @Type(() => AddressDto)
    @ApiProperty()
    departureAddress?: AddressDto;

    @IsOptional()
    @Type(() => AddressDto)
    @ApiProperty()
    destinationAddress?: AddressDto;

    @IsOptional()
    @IsEnum(ParcelStatus)
    @ApiProperty({ enum: ParcelStatus, default: ParcelStatus.PENDING })
    status?: ParcelStatus;

    @IsOptional()
    @IsNumber()
    @ApiProperty()
    price?: number;

    @IsOptional()
    @IsDateString()
    @ApiProperty()
    estimatedPickUpTime?: Date;

    @IsOptional()
    @IsDateString()
    @ApiProperty()
    estimatedDeliveryTime?: Date;

    @IsOptional()
    @IsDateString()
    @ApiProperty()
    createdAt?: Date;

    @IsOptional()
    @IsDateString()
    @ApiProperty()
    receivedAt?: Date;

    @IsOptional()
    @IsDateString()
    @ApiProperty()
    updatedAt?: Date;
}
