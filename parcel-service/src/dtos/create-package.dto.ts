import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { Address, Dimension } from '../repository';
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

    // @Transform(({ obj: { _id } }) => _id?.toString())
    @ApiProperty()
    departurePostOffice?: string;

    // @Transform(({ obj: { _id } }) => _id?.toString())
    @ApiProperty()
    destinationPostOffice?: string;

    @Type(() => AddressDto)
    @ApiProperty()
    departureAddress?: AddressDto;

    @Type(() => AddressDto)
    @ApiProperty()
    destinationAddress?: AddressDto;

    @IsEnum(ParcelStatus)
    @ApiProperty({enum: ParcelStatus, default: ParcelStatus.PENDING})
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
