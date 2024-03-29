import { Injectable } from '@nestjs/common';
import { CreatePackageDto, UpdatePackageDto } from '../dtos';
import { Package, PackageRepository } from '../repository';
import { PackageServiceInterface } from './package.service.interface';
import { FilterQuery, PipelineStage } from 'mongoose';
import { ParcelStatus } from '../enums';
import { PriceEstimationService } from './price-estimation.service';

@Injectable()
export class PackageService
    implements
        PackageServiceInterface<Package, CreatePackageDto, UpdatePackageDto>
{
    constructor(
        private readonly packageRepository: PackageRepository,
        private readonly priceEstimationService: PriceEstimationService,
    ) {}

    async findAll(filter?: FilterQuery<Package>): Promise<Package[]> {
        return this.packageRepository.findAll(filter);
    }

    async findById(id: string): Promise<Package | null> {
        return this.packageRepository.findById(id);
    }

    async create(createDto: CreatePackageDto): Promise<Package> {
        createDto.createdAt = new Date();
        createDto.updatedAt = new Date();
        createDto.status = ParcelStatus.REGISTERED;
        // TODO: use price estimation service
        createDto.price = await this.priceEstimationService.estimatePrice(
            createDto.dimensions,
            createDto.weight,
        );

        return this.packageRepository.create(createDto);
    }

    async update(
        id: string,
        status: string,
    ): Promise<Package | null> {
        return this.packageRepository.update(id, status);
    }

    async remove(id: string): Promise<Package | null> {
        return this.packageRepository.delete(id);
    }

    async findPaginated(
        pipeline: PipelineStage[],
    ): Promise<{ items: Package[]; itemsCount: number }> {
        return this.packageRepository.findPaginated(pipeline);
    }
}
