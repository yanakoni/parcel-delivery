import {
  AddressAccordion,
  AddressAccordionProps,
  PackageDimensionsForm,
  PackageDimensionsFormProps,
  UserAccordion,
  UserAccordionProps,
} from './components';
import { AccordionItem } from '../../components';

interface AccordionsProps {
  userAccordion: UserAccordionProps;
  packageDimensions: PackageDimensionsFormProps;
  address: AddressAccordionProps;
}

const accordions = ({ userAccordion, packageDimensions, address }: AccordionsProps): AccordionItem[] => [
  {
    accordionId: 'userAccordion',
    accordionSummary: 'Receiver',
    accordionDetails: (
      <UserAccordion
        key="userAccordion"
        sender={userAccordion.sender}
        receiver={userAccordion.receiver}
        onSenderChange={userAccordion.onSenderChange}
      />
    ),
  },
  {
    accordionId: 'packageDimensions',
    accordionSummary: 'Package Dimensions',
    accordionDetails: (
      <PackageDimensionsForm
        key="packageDimensions"
        errors={packageDimensions.errors}
        register={packageDimensions.register}
      />
    ),
  },
  {
    accordionId: 'addressesAccordion',
    accordionSummary: 'Pick Up and Delivery',
    accordionDetails: (
      <AddressAccordion
        key="addressesAccordion"
        pickUp={address.pickUp}
        delivery={address.delivery}
        pickUpPostOfficeId={address.pickUpPostOfficeId}
        deliveryPostOfficeId={address.deliveryPostOfficeId}
        onPostOfficeSelect={address.onPostOfficeSelect}
      />
    ),
  },
];

export { accordions };
export type { AccordionsProps };
