export interface ServiceInterface<T> {
    findAll(): Promise<T[]>;
    findOne(id: string): Promise<T | null>;
    create(createDto: any): Promise<T>;
    update(id: string, updateDto: any): Promise<T | null>;
    remove(id: string): Promise<T | null>;
}
