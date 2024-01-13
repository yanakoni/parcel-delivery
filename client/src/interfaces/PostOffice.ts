import { Address } from './Address';

interface PostOffice {
  _id: string;
  name: string;
  address: Address;
  contactNumber: string;
  workingHours: string;
  servicesOffered: string;
}

export type { PostOffice };
