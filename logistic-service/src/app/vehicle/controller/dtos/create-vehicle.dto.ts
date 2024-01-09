import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateVehicleDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    name: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    type: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    manufacturer: string;

    @IsNotEmpty()
    @ApiProperty()
    capacity: number;
}
