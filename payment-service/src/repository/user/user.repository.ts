import {
    BadRequestException,
    Inject,
    Injectable,
    Logger,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, PipelineStage } from 'mongoose';
import { User, UserDocument } from './user.model';

@Injectable()
export class UserRepository {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        @Inject(Logger) private logger: Logger,
    ) {}

    async findAll(filter: FilterQuery<User> = {}): Promise<UserDocument[]> {
        return this.userModel.find(filter).exec();
    }

    async findById(id: string): Promise<UserDocument | null> {
        return this.userModel.findById(id).exec();
    }

    async create(createDto: any): Promise<UserDocument> {
        const createdUser = new this.userModel(createDto);
        return createdUser.save();
    }

    async update(id: string, updateDto: any): Promise<UserDocument | null> {
        return this.userModel
            .findByIdAndUpdate(id, updateDto, { new: true })
            .exec();
    }

    async delete(id: string): Promise<UserDocument | null> {
        return this.userModel.findByIdAndRemove(id).exec();
    }

    async findPaginated(
        pipeline: PipelineStage[],
    ): Promise<{ items: UserDocument[]; itemsCount: number }> {
        const items = await this.userModel.aggregate(pipeline);

        if (!items) {
            throw new BadRequestException("Users' read operation failed.");
        }

        return {
            items,
            itemsCount: await this.userModel.countDocuments(),
        };
    }
}
