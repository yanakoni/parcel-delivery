import { Injectable } from '@nestjs/common';
import { CreatePostOfficeDto } from '../controller/dtos/create-postOffice.dto';
import { UpdatePostOfficeDto } from '../controller/dtos/update-postOffice.dto';
import { PostOfficeRepository } from '../repository/postOffice.repository';

@Injectable()
export class PostOfficeService {
    constructor(private readonly postOfficeRepository: PostOfficeRepository) {}

    async findAll() {
        const postOffices = await this.postOfficeRepository.findAll();
        return postOffices.map(this.mapToDto);
    }

    async findOne(id: string) {
        const postOffices = await this.postOfficeRepository.findById(id);
        return this.mapToDto(postOffices);
    }

    async create(createDto: CreatePostOfficeDto) {
        const createdVehicle = await this.postOfficeRepository.create(createDto);
        return this.mapToDto(createdVehicle);
    }

    async update(id: string, updateDto: UpdatePostOfficeDto) {
        const updatedVehicle = await this.postOfficeRepository.update(id, updateDto);
        return this.mapToDto(updatedVehicle);
    }

    async remove(id: string) {
        const deletedVehicle = await this.postOfficeRepository.delete(id);
        return this.mapToDto(deletedVehicle);
    }

    private mapToDto(postOffice: any) {
        if (!postOffice) {
            return null;
        }
        const { _id, ...rest } = postOffice._doc;
        return { id: _id, ...rest };
    }
}
