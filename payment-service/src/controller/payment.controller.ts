import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Put,
    ValidationPipe,
} from '@nestjs/common';
import { Public, Resource, Roles } from 'nest-keycloak-connect';
import { ApiTags } from '@nestjs/swagger';
import {
    AddCardToStripeCustomerDto,
    AddTokenToStripeCustomerDto,
    CreateStripeCustomerDto,
    StripeCustomerChargeDto,
} from '../dtos';
import { PaymentService } from '../service';
import { Payment, UserDocument } from '../repository';

@ApiTags('Payment')
@Controller('payment')
@Resource(Payment.name)
export class PaymentController {
    constructor(private readonly paymentService: PaymentService) {}

    @Put('token/:id')
    @Public()
    async addToken(
        @Param('id') userId: string,
        @Body(new ValidationPipe()) dto: AddTokenToStripeCustomerDto,
    ) {
        await this.paymentService.addToken(userId, dto);
        return { data: 'OK' };
    }

    @Put('card/:id')
    @Public()
    async addCardToCustomer(
        @Param('id') userId: string,
        @Body(new ValidationPipe()) dto: AddCardToStripeCustomerDto,
    ) {
        const card = await this.paymentService.addCardToCustomer(userId, dto);
        return { data: card };
    }

    @Get()
    @Roles({ roles: ['admin'] })
    async findAll() {
        const stripeCustomers = await this.paymentService.getAllCustomers();
        return { data: stripeCustomers };
    }

    @Get(':id')
    @Public()
    async findOne(@Param('id') id: string) {
        const stripeCustomer = await this.paymentService.findCustomer(id);
        return { data: stripeCustomer };
    }

    @Post('customer/:id')
    @Public()
    async createCustomer(
        @Param('id') userId: UserDocument['_id'],
        @Body(new ValidationPipe()) dto: CreateStripeCustomerDto,
    ) {
        await this.paymentService.createCustomer(userId, dto);
        return { data: 'OK' };
    }

    @Post('charge/:id')
    @Roles({ roles: ['user', 'admin'] })
    async chargeCustomer(
        @Param('id') userId: UserDocument['_id'],
        @Body(new ValidationPipe()) createDto: StripeCustomerChargeDto,
    ) {
        const { chargeStatus } = await this.paymentService.chargeCustomer(
            userId,
            createDto,
        );
        return { data: chargeStatus };
    }
}
