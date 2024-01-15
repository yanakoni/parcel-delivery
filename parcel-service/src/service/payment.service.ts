import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createHash } from 'crypto';
import Stripe from 'stripe';
import { PaymentServiceInterface } from './payment.service.interface';
import { PaymentDetails } from '../types';
import {
    Address,
    PackageRepository,
    PaymentRepository,
    User,
    UserRepository,
} from '../repository';
import {
    AddCardToStripeCustomerDto,
    AddTokenToStripeCustomerDto,
} from '../dtos';

@Injectable()
export class PaymentService implements PaymentServiceInterface {
    private readonly stripe: Stripe;

    constructor(
        private readonly configService: ConfigService,
        private readonly userRepository: UserRepository,
        private readonly paymentRepository: PaymentRepository,
        private readonly packageRepository: PackageRepository,
    ) {
        this.stripe = new Stripe(
            'sk_test_51OYXecL2SeZcpegNzmuQxQS7qQ2QUSUbgGFFUhievPo1gBwUaPS6xw0bh0UZqiYGOMdWtycro9PozSy0Epr441Ww00TG4gJyPM',
        );
    }

    async paymentInit(
        packageId: string,
        paymentMethodId: string,
        amount: number,
    ) {
        const payment = await this.stripe.paymentIntents.create({
            amount: Math.floor(amount * 100),
            currency: 'usd',
            payment_method: paymentMethodId,
            confirm: true,
            return_url: 'http://localhost:5173/dashboard',
        });
        const parcel = await this.packageRepository.findById(packageId);

        const { card } = await this.stripe.paymentMethods.retrieve(
            payment.payment_method as string,
        );

        await this.paymentRepository.create({
            userId: parcel.sender,
            cardNumber: card.last4,
            amount: payment.amount,
            datePurchase: new Date(payment.created * 1000),
            status: payment.status,
        });

        return { status: payment.status };
    }

    async addToken(userId: string, { token }: AddTokenToStripeCustomerDto) {
        await this.stripe.customers.update(userId, {
            source: token,
        });
    }

    async addCardToCustomer(
        userId: string,
        { cardToken }: AddCardToStripeCustomerDto,
    ) {
        const card = await this.stripe.customers.createSource(userId, {
            source: cardToken,
        });

        if (card.object === 'card') {
            await this.userRepository.update(userId, {
                paymentInformation: {
                    card: {
                        brand: card.brand,
                        expDate: `${card.exp_month}/${card.exp_year}`,
                        last4: card.last4,
                    },
                },
            });
        }

        return card;
    }

    async getAllPaymentsById(userId?: string) {
        if (!userId) {
            return this.paymentRepository.findAll();
        }
        return this.paymentRepository.findAll({ userId });
    }

    async getAllCustomers() {
        return this.stripe.customers.list();
    }

    async findCustomer(userId: string) {
        return (await this.stripe.customers.retrieve(
            userId,
        )) as Stripe.Response<Stripe.Customer>;
    }

    async createCustomer(userId: string, data: Stripe.CustomerCreateParams) {
        const user = await this.userRepository.findById(userId);

        if (user) {
            const customer = await this.stripe.customers.create({
                ...data,
                email: user.email,
            });

            await this.userRepository.update(user._id, {
                stripeId: customer.id,
            });
        } else {
            const customer = await this.stripe.customers.create({
                ...data,
            });

            const userAddress: Address[] = customer.shipping?.address
                ? [
                      {
                          country: customer.shipping.address.country,
                          state: customer.shipping.address.state,
                          city: customer.shipping.address.city,
                          street: customer.shipping.address.line1,
                          tel: customer.phone,
                      },
                  ]
                : [];

            const newUser: User = {
                username: user.email.split('@')[0],
                password: createHash('sha256').update(data.email).digest('hex'),
                email: user.email,
                profileInformation: {},
                deliveryAddresses: userAddress,
                favouriteAddresses: userAddress,
                paymentInformation: {
                    currency: customer.currency,
                    preferredLocales: customer.preferred_locales,
                    sources: customer.sources,
                    ip: customer.tax.ip_address,
                    metadata: customer.metadata,
                    card: {
                        brand: null,
                        expDate: null,
                        last4: null,
                    },
                },
                preferences: {},
                stripeId: customer.id,
            };

            await this.userRepository.create(newUser);
        }
    }

    async chargeCustomer(userId: string, details: PaymentDetails) {
        const [user, customer] = await Promise.all([
            this.userRepository.findById(userId),
            this.findCustomer(userId),
        ]);
        const charge = {
            customer: customer.id,
            receipt_email: customer.email,
            ...details,
        };

        const chargeStatus = await this.stripe.charges.create(charge);

        const cardNumber = chargeStatus.payment_method_details.card.last4;

        if (!cardNumber) {
            throw new Error('Invalid card number!');
        }

        await this.paymentRepository.create({
            userId: user._id.toString(),
            cardNumber,
            amount: details.amount,
            datePurchase: new Date(),
            status: chargeStatus.status,
        });

        return { chargeStatus };
    }
}
