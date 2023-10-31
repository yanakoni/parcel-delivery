import { Module } from '@nestjs/common';
import { VehicleController } from './vehicle/controller/vehicle.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { VehicleService } from './vehicle/service/vehicle.service';
import { VehicleRepository } from './vehicle/repository/vehicle.repository';
import { Vehicle, VehicleSchema } from './vehicle/repository/vehicle.model';

@Module({
    controllers: [VehicleController],
    providers: [VehicleService, VehicleRepository],
    //  FIXME: rertieve connection string from app config
    imports: [
        MongooseModule.forRoot('mongodb://root:example@logistic-db:27017'),
        MongooseModule.forFeature([
            {
                name: Vehicle.name,
                schema: VehicleSchema,
            },
        ]),
    ],
})
export class AppModule {}
