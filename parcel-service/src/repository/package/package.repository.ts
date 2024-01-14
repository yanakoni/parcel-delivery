import {
    BadRequestException,
    Inject,
    Injectable,
} from '@nestjs/common';
import { FilterQuery, Model, PipelineStage } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { RepositoryInterface } from './package.repository.interface';
import { Package } from './package.model';

@Injectable()
export class PackageRepository implements RepositoryInterface<Package> {
    constructor(
        @InjectModel(Package.name) private packageModel: Model<Package>
    ) {}

    async findAll(filter: FilterQuery<Package> = {}): Promise<Package[]> {
        return this.packageModel.find(filter).exec();
    }

    async findById(id: string): Promise<Package | null> {
        return this.packageModel.findById(id).exec();
    }

    async create(createDto: any): Promise<Package> {
        const createdPackage = new this.packageModel(createDto);
        return createdPackage.save();
    }

    async update(id: string, updateDto: any): Promise<Package | null> {
        return this.packageModel
            .findByIdAndUpdate(id, updateDto, { new: true })
            .exec();
    }

    async delete(id: string): Promise<Package | null> {
        return this.packageModel.findByIdAndRemove(id).exec();
    }

    async findPaginated(
        pipeline: PipelineStage[],
    ): Promise<{ items: Package[]; itemsCount: number }> {
        const items = await this.packageModel.aggregate(pipeline);

        if (!items) {
            throw new BadRequestException("Packages' read operation failed.");
        }

        return {
            items,
            itemsCount: await this.packageModel.countDocuments(),
        };
    }
}
