import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Package, PackageRepository, PackageSchema } from './repository';
import { PackageController } from './controller';
import { PackageService } from './service';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Package.name, schema: PackageSchema },
        ]),
    ],
    controllers: [PackageController],
    providers: [PackageService, PackageRepository],
})
export class PackageModule {}
