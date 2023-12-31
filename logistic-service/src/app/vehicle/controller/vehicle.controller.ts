import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    ValidationPipe,
} from '@nestjs/common';
import { VehicleService } from '../service/vehicle.service';
import { CreateVehicleDto } from './dtos/create-vehicle.dto';
import { UpdateVehicleDto } from './dtos/update-vehicle.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Vehicles')
@Controller('vehicles')
export class VehicleController {
    constructor(private readonly vehicleService: VehicleService) {}

    @Get()
    async findAll() {
        const vehicles = await this.vehicleService.findAll();
        return { data: vehicles };
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        const vehicle = await this.vehicleService.findOne(id);
        return { data: vehicle };
    }

    @Post()
    async create(@Body(new ValidationPipe()) createDto: CreateVehicleDto) {
        const vehicle = await this.vehicleService.create(createDto);
        return { data: vehicle };
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body(new ValidationPipe()) updateDto: UpdateVehicleDto,
    ) {
        const updatedVehicle = await this.vehicleService.update(id, updateDto);
        return { data: updatedVehicle };
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        const deletedVehicle = await this.vehicleService.remove(id);
        return { data: deletedVehicle };
    }
}
