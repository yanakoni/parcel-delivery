import { Address } from './Address';
import { PaymentInformation } from './PaymentInformation';

interface User {
  _id: string;
  username: string;
  email: string;
  profileInformation: any;
  deliveryAddresses: Address[];
  favouriteAddresses: Address[];
  paymentInformation: PaymentInformation;
  preferences: any;
  stripeId: string;
}

interface UserWithRole extends User {
  userRole: any;
}

export type { User, UserWithRole };
