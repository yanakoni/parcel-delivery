

interface Vehicle {
  _id: string;
  username: string;
  email: string;
  profileInformation: any;
  // deliveryAddresses: Address[];
  // favouriteAddresses: Address[];
  // paymentInformation: PaymentInformation;
  preferences: any;
  stripeId: string;
}

// interface U

export type { Vehicle };
