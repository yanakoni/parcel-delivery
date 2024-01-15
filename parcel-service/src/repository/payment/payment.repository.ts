import {
    BadRequestException,
    Inject,
    Injectable,
    Logger,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, PipelineStage } from 'mongoose';
import { Payment } from './payment.model';

@Injectable()
export class PaymentRepository {
    constructor(
        @InjectModel(Payment.name) private paymentModel: Model<Payment>,
        @Inject(Logger) private logger: Logger,
    ) {}

    async findAll(filter: FilterQuery<Payment> = {}): Promise<Payment[]> {
        return this.paymentModel.find(filter).sort({ _id: -1 }).exec();
    }

    async findById(id: string): Promise<Payment | null> {
        return this.paymentModel.findById(id).exec();
    }

    async create(createDto: any): Promise<Payment> {
        const createdPayment = new this.paymentModel(createDto);
        return createdPayment.save();
    }

    async update(id: string, updateDto: any): Promise<Payment | null> {
        return this.paymentModel
            .findByIdAndUpdate(id, updateDto, { new: true })
            .exec();
    }

    async delete(id: string): Promise<Payment | null> {
        return this.paymentModel.findByIdAndRemove(id).exec();
    }

    async findPaginated(
        pipeline: PipelineStage[],
    ): Promise<{ items: Payment[]; itemsCount: number }> {
        const items = await this.paymentModel.aggregate(pipeline);

        if (!items) {
            throw new BadRequestException("Payments' read operation failed.");
        }

        return {
            items,
            itemsCount: await this.paymentModel.countDocuments(),
        };
    }
}
