import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Put,
    Query,
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

    @Post()
    @Public()
    async initPayment(
        @Query('packageId') packageId: string,
        @Query('paymentMethodId') paymentMethodId: string,
        @Query('amount') amount: number,
    ) {
        return await this.paymentService.paymentInit(
            packageId,
            paymentMethodId,
            amount,
        );
    }

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
    @Roles({ roles: ['user', 'admin'] })
    async findAllPayments(@Query('userId') userId?: string) {
        console.log(await this.paymentService.getAllPaymentsById(userId));
        const stripePayments =
            await this.paymentService.getAllPaymentsById(userId);
        return { data: stripePayments };
    }

    @Get('/customers')
    @Roles({ roles: ['admin'] })
    async findAllCustomers() {
        const stripeCustomers = await this.paymentService.getAllCustomers();
        return { data: stripeCustomers };
    }

    @Get('/by-id/:id')
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
