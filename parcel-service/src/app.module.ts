import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Package, PackageRepository, PackageSchema } from './repository';
import { PackageController } from './controller';
import { PackageService } from './service';
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
    controllers: [PackageController],
    providers: [PackageService, PackageRepository],
    //  FIXME: rertieve connection string from app config
    imports: [
        MongooseModule.forRoot('mongodb://root:example@logistic-db:27017'),
        MongooseModule.forFeature([
            {
                name: Package.name,
                schema: PackageSchema,
            },
        ]),
    ],
})
export class AppModule {}
