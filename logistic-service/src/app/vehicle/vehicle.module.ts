import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VehicleController } from './controller/vehicle.controller';
import { VehicleService } from './service/vehicle.service';
import { Vehicle, VehicleSchema } from './repository/vehicle.model';
import { VehicleRepository } from './repository/vehicle.repository';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Vehicle.name, schema: VehicleSchema },
        ]),
    ],
    controllers: [VehicleController],
    providers: [VehicleService, VehicleRepository],
})
export class VehicleModule {}
