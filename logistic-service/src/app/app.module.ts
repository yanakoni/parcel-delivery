import { Module } from '@nestjs/common';
import { VehicleController } from './vehicle/controller/vehicle.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { VehicleService } from './vehicle/service/vehicle.service';
import { VehicleRepository } from './vehicle/repository/vehicle.repository';
import { Vehicle, VehicleSchema } from './vehicle/repository/vehicle.model';
import { PostOfficeController } from './postOffice/controller/postOffice.controller';
import { PostOfficeService } from './postOffice/service/postOffice.service';
import { PostOfficeRepository } from './postOffice/repository/postOffice.repository';
import {
    PostOffice,
    PostOfficeSchema,
} from './postOffice/repository/postOffice.model';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';

@Module({
    controllers: [VehicleController, PostOfficeController],
    providers: [
        VehicleService,
        VehicleRepository,
        PostOfficeService,
        PostOfficeRepository,
        ConfigService,
    ],
    imports: [
      ConfigModule.forRoot({
        load: [configuration],
        isGlobal: true
      }),
      MongooseModule.forRootAsync({
        inject: [ConfigService],
          useFactory: (configService: ConfigService) => ({
              uri: configService.get('DB_CONN_STRING'),
          }),
      }),
        MongooseModule.forFeature([
            {
                name: Vehicle.name,
                schema: VehicleSchema,
            },
            {
                name: PostOffice.name,
                schema: PostOfficeSchema,
            },
        ]),
    ],
})
export class AppModule {}
