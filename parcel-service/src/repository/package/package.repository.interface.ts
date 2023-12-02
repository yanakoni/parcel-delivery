import { PipelineStage } from 'mongoose';

export interface RepositoryInterface<T> {
    findAll(): Promise<T[]>;
    findById(id: string): Promise<T | null>;
    findPaginated(
        pipeline: PipelineStage[],
    ): Promise<{ items: T[]; itemsCount: number }>;
    create(createDto: any): Promise<T>;
    update(id: string, updateDto: any): Promise<T | null>;
    delete(id: string): Promise<T | null>;
}
