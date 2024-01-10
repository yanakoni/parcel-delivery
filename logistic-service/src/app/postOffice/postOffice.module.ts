import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostOfficeController } from './controller/postOffice.controller';
import { PostOfficeService } from './service/postOffice.service';
import { PostOffice, PostOfficeSchema } from './repository/postOffice.model';
import { PostOfficeRepository } from './repository/postOffice.repository';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: PostOffice.name, schema: PostOfficeSchema },
        ]),
    ],
    controllers: [PostOfficeController],
    providers: [PostOfficeService, PostOfficeRepository],
})
export class PostOfficeModule {}
