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
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import { PaymentRepository } from './repository/payment';
import { UserRepository } from './repository/user';

@Module({
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
    imports: [
        ConfigModule.forRoot({
            load: [configuration],
            isGlobal: true,
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
            { name: Payment.name, schema: PaymentSchema },
            { name: User.name, schema: UserSchema },
        ]),
    ],
})
export class AppModule {}
