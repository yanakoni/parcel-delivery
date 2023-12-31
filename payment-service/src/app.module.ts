import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Payment, PaymentRepository, PaymentSchema } from './repository';
import { PaymentController } from './controller';
import { PaymentService } from './service';
import {
    KeycloakConnectModule,
    PolicyEnforcementMode,
    TokenValidation,
} from 'nest-keycloak-connect';

KeycloakConnectModule.register(`../keycloak.json`, {
    policyEnforcement: PolicyEnforcementMode.PERMISSIVE,
    tokenValidation: TokenValidation.ONLINE,
});

@Module({
    controllers: [PaymentController],
    providers: [PaymentService, PaymentRepository],
    //  FIXME: retrieve connection string from app config
    imports: [
        MongooseModule.forRoot('mongodb://root:example@logistic-db:27017'),
        MongooseModule.forFeature([
            {
                name: Payment.name,
                schema: PaymentSchema,
            },
        ]),
    ],
})
export class AppModule {}
