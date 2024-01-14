import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Package, PackageRepository, PackageSchema } from './repository';
import { PackageController } from './controller';
import { PackageService } from './service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';


@Module({
    controllers: [PackageController],
    providers: [PackageService, PackageRepository],
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
                name: Package.name,
                schema: PackageSchema,
            },
        ]),
    ],
})
export class AppModule {}
