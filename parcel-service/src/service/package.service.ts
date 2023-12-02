import { Injectable } from '@nestjs/common';
import { CreatePackageDto, UpdatePackageDto } from '../dtos';
import { Package, PackageRepository } from '../repository';
import { PackageServiceInterface } from './package.service.interface';
import { FilterQuery, PipelineStage } from 'mongoose';

@Injectable()
export class PackageService
    implements
        PackageServiceInterface<Package, CreatePackageDto, UpdatePackageDto>
{
    constructor(private readonly packageRepository: PackageRepository) {}

    async findAll(filter?: FilterQuery<Package>): Promise<Package[]> {
        return this.packageRepository.findAll(filter);
    }

    async findById(id: string): Promise<Package | null> {
        return this.packageRepository.findById(id);
    }

    async create(createDto: CreatePackageDto): Promise<Package> {
        return this.packageRepository.create(createDto);
    }

    async update(
        id: string,
        updateDto: UpdatePackageDto,
    ): Promise<Package | null> {
        return this.packageRepository.update(id, updateDto);
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
