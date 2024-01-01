import Stripe from 'stripe';
import { PaymentDetails } from '../types';
import {
    AddCardToStripeCustomerDto,
    AddTokenToStripeCustomerDto,
} from '../dtos';

export interface PaymentServiceInterface {
    getAllCustomers(): Promise<
        Stripe.Response<Stripe.ApiList<Stripe.Customer>>
    >;
    findCustomer(userId: string): Promise<Stripe.Response<Stripe.Customer>>;
    createCustomer(
        userId: string,
        data: Stripe.CustomerCreateParams,
    ): Promise<void>;
    addToken(userId: string, data: AddTokenToStripeCustomerDto): Promise<void>;
    addCardToCustomer(
        userId: string,
        data: AddCardToStripeCustomerDto,
    ): Promise<Stripe.CustomerSource>;
    chargeCustomer(
        userId: string,
        details: PaymentDetails,
    ): Promise<{ chargeStatus: Stripe.Response<Stripe.Charge> }>;
}
