import { FilterQuery, Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RepositoryInterface } from './postOffice.repository.interface';

import { PostOffice } from './postOffice.model';

@Injectable()
export class PostOfficeRepository implements RepositoryInterface<PostOffice> {
    constructor(
        @InjectModel(PostOffice.name)
        private postOfficeModel: Model<PostOffice>,
    ) {}

    async findAll(namePrefix?: string): Promise<PostOffice[]> {
      const query: FilterQuery<PostOffice> = namePrefix
          ? { name: { $regex: new RegExp(`^${namePrefix}`, 'i') } }
          : {};

      return this.postOfficeModel.find(query).exec();
  }

    async findById(id: string): Promise<PostOffice | null> {
        return this.postOfficeModel.findById(id).exec();
    }

    async create(createDto: any): Promise<PostOffice> {
        const createdVehicle = new this.postOfficeModel(createDto);
        return createdVehicle.save();
    }

    async update(id: string, updateDto: any): Promise<PostOffice | null> {
        return this.postOfficeModel
            .findByIdAndUpdate(id, updateDto, { new: true })
            .exec();
    }

    async delete(id: string): Promise<PostOffice | null> {
        return this.postOfficeModel.findByIdAndRemove(id).exec();
    }
}
