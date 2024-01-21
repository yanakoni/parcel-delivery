import { FilterQuery, PipelineStage } from 'mongoose';
import { Package } from '../repository';

export interface PackageServiceInterface<T, CT, UT> {
    findAll(filter: FilterQuery<Package>): Promise<T[]>;
    findById(id: string): Promise<T | null>;
    findPaginated(
        pipeline: PipelineStage[],
    ): Promise<{ items: T[]; itemsCount: number }>;
    create(createDto: CT): Promise<T>;
    update(id: string, status: string): Promise<T | null>;
    remove(id: string): Promise<T | null>;
}
