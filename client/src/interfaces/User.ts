interface Address {
  country: string;
  state: string;
  city: string;
  street: string;
  tel: string;
  note: string;
}

interface PaymentInformation {
  currency: string;
  preferredLocales: string[];
  sources: any;
  ip: string;
  metadata: any;
  card: {
    brand: string;
    expDate: string;
    last4: string;
  };
}

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

export type { User, UserWithRole, Address, PaymentInformation };
