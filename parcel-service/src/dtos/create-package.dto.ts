import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { Address, Dimension } from '../repository';
import { ParcelStatus } from '../enums';

export class CreatePackageDto {
    @Transform(({ obj: { _id } }) => _id.toString())
    @IsNotEmpty()
    @ApiProperty()
    sender: string;

    @Transform(({ obj: { _id } }) => _id.toString())
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

    @Transform(({ obj: { _id } }) => _id?.toString())
    @IsNotEmpty()
    @ApiProperty()
    departurePostOffice?: string;

    @Transform(({ obj: { _id } }) => _id?.toString())
    @ApiProperty()
    destinationPostOffice?: string;

    @Type(() => Address)
    @ApiProperty()
    departureAddress?: Address;

    @Type(() => Address)
    @ApiProperty()
    destinationAddress?: Address;

    @IsEnum(ParcelStatus)
    @IsNotEmpty()
    @ApiProperty()
    status: ParcelStatus;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    price: number;

    @IsDateString()
    @IsNotEmpty()
    @ApiProperty()
    estimatedPickUpTime?: Date;

    @IsDateString()
    @IsNotEmpty()
    @ApiProperty()
    estimatedDeliveryTime?: Date;

    @IsDateString()
    @IsNotEmpty()
    @ApiProperty()
    createdAt: Date;

    @IsDateString()
    @IsNotEmpty()
    @ApiProperty()
    receivedAt: Date;

    @IsDateString()
    @IsNotEmpty()
    @ApiProperty()
    updatedAt: Date;
}
