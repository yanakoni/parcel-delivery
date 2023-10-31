import { Injectable } from '@nestjs/common';
import { Vehicle } from '../repository/vehicle.model';
import { CreateVehicleDto } from '../controller/dtos/create-vehicle.dto';
import { UpdateVehicleDto } from '../controller/dtos/update-vehicle.dto';
import { VehicleRepository } from '../repository/vehicle.repository';

@Injectable()
export class VehicleService {
    constructor(private readonly vehicleRepository: VehicleRepository) {}

    async findAll(): Promise<Vehicle[]> {
        return this.vehicleRepository.findAll();
    }

    async findOne(id: string): Promise<Vehicle | null> {
        return this.vehicleRepository.findById(id);
    }

    async create(createDto: CreateVehicleDto): Promise<Vehicle> {
        return this.vehicleRepository.create(createDto);
    }

    async update(
        id: string,
        updateDto: UpdateVehicleDto,
    ): Promise<Vehicle | null> {
        return this.vehicleRepository.update(id, updateDto);
    }

    async remove(id: string): Promise<Vehicle | null> {
        return this.vehicleRepository.delete(id);
    }
}
