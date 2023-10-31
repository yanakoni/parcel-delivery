import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RepositoryInterface } from './vehicle.repository.interface';

import { Vehicle } from './vehicle.model';

@Injectable()
export class VehicleRepository implements RepositoryInterface<Vehicle> {
    constructor(
        @InjectModel(Vehicle.name) private vehicleModel: Model<Vehicle>,
    ) {}

    async findAll(): Promise<Vehicle[]> {
        return this.vehicleModel.find().exec();
    }

    async findById(id: string): Promise<Vehicle | null> {
        return this.vehicleModel.findById(id).exec();
    }

    async create(createDto: any): Promise<Vehicle> {
        const createdVehicle = new this.vehicleModel(createDto);
        return createdVehicle.save();
    }

    async update(id: string, updateDto: any): Promise<Vehicle | null> {
        return this.vehicleModel
            .findByIdAndUpdate(id, updateDto, { new: true })
            .exec();
    }

    async delete(id: string): Promise<Vehicle | null> {
        return this.vehicleModel.findByIdAndRemove(id).exec();
    }
}
