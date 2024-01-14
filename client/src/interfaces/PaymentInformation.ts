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

export type { PaymentInformation };
