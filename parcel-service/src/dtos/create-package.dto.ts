import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { Address, Dimension } from '../repository';
import { ParcelStatus } from '../enums';

export class CreatePackageDto {
    // @Transform(({ obj: { _id } }) => _id.toString())
    @IsNotEmpty()
    @ApiProperty()
    sender: string;

    // @Transform(({ obj: { _id } }) => _id.toString())
    @IsNotEmpty()
    @ApiProperty()
    receiver: string;

    @Type(() => Dimension)
    @IsNotEmpty()
    @ApiProperty()
    dimensions: Dimension;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    weight: number;

    // @Transform(({ obj: { _id } }) => _id?.toString())
    @ApiProperty()
    departurePostOffice?: string;

    // @Transform(({ obj: { _id } }) => _id?.toString())
    @ApiProperty()
    destinationPostOffice?: string;

    @Type(() => Address)
    @ApiProperty()
    departureAddress?: Address;

    @Type(() => Address)
    @ApiProperty()
    destinationAddress?: Address;

    @IsEnum(ParcelStatus)
    @ApiProperty()
    status?: ParcelStatus;

    @IsNumber()
    @ApiProperty()
    price?: number;

    @IsDateString()
    @ApiProperty()
    estimatedPickUpTime?: Date;

    @IsDateString()
    @ApiProperty()
    estimatedDeliveryTime?: Date;

    @IsDateString()
    @ApiProperty()
    createdAt?: Date;

    @IsDateString()
    @ApiProperty()
    receivedAt?: Date;

    @IsDateString()
    @ApiProperty()
    updatedAt?: Date;
}
