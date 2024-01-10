import { Injectable } from '@nestjs/common';
import { CreateVehicleDto } from '../controller/dtos/create-vehicle.dto';
import { UpdateVehicleDto } from '../controller/dtos/update-vehicle.dto';
import { VehicleRepository } from '../repository/vehicle.repository';

@Injectable()
export class VehicleService {
    constructor(private readonly vehicleRepository: VehicleRepository) {}

    async findAll() {
        const vehicles = await this.vehicleRepository.findAll();
        return vehicles.map(this.mapToDto);
    }

    async findOne(id: string) {
        const vehicle = await this.vehicleRepository.findById(id);
        return this.mapToDto(vehicle);
    }

    async create(createDto: CreateVehicleDto) {
        const createdVehicle = await this.vehicleRepository.create(createDto);
        return this.mapToDto(createdVehicle);
    }

    async update(id: string, updateDto: UpdateVehicleDto) {
        const updatedVehicle = await this.vehicleRepository.update(id, updateDto);
        return this.mapToDto(updatedVehicle);
    }

    async remove(id: string) {
        const deletedVehicle = await this.vehicleRepository.delete(id);
        return this.mapToDto(deletedVehicle);
    }

    private mapToDto(vehicle: any) {
        if (!vehicle) {
            return null;
        }
        const { _id, ...rest } = vehicle._doc;
        return { id: _id, ...rest };
    }
}
