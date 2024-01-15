import { Logger, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
    Package,
    PackageRepository,
    PackageSchema,
    Payment,
    PaymentSchema,
    User,
    UserSchema,
} from './repository';
import { PackageController, PaymentController } from './controller';
import {
    PackageService,
    PaymentService,
    PriceEstimationService,
} from './service';
import { PaymentRepository } from './repository/payment';
import { UserRepository } from './repository/user';
import { ConfigService } from '@nestjs/config';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Package.name, schema: PackageSchema },
            { name: Payment.name, schema: PaymentSchema },
            { name: User.name, schema: UserSchema },
        ]),
    ],
    controllers: [PackageController, PaymentController],
    providers: [
        PriceEstimationService,
        PackageService,
        PackageRepository,
        PaymentService,
        PaymentRepository,
        UserRepository,
        Logger,
        ConfigService,
    ],
})
export class PackageModule {}
