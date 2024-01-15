import { Box, Typography } from '@mui/material';
import { styles } from '../dashboard/styles';
import { LoadingButton } from '@mui/lab';
import { FormProvider, useForm } from 'react-hook-form';
import { FormEvent, useCallback, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { coerce, number, object, string, TypeOf } from 'zod';
import { Address, Dimension } from '../../interfaces';
import { ParcelStatus } from '../../enums';
import { showNotification } from '../../utils';
import { hasErrorMessage, isApiError, isZodError } from '../../guards';
import { ControlledAccordion } from '../../components';
import { accordions, AccordionsProps } from './accordions';
import { PaymentPage } from './PaymentPage';

type PackageForm = {
  id: number | null;
  sender: string;
  senderObj?: {
    username: string;
    email: string;
  };
  receiver: string;
  dimensions: Dimension;
  weight: number;
  departurePostOffice?: string;
  destinationPostOffice?: string;
  departureAddress?: Address | null;
  destinationAddress?: Address | null;
  status?: ParcelStatus;
  price?: number;
  estimatedPickUpTime?: Date;
  estimatedDeliveryTime?: Date;
  createdAt?: Date;
  updatedAt?: Date;
};

const initialErrors: any = {
  sender: '',
  senderObj: {
    username: '',
    email: '',
  },
  receiver: '',
  dimensions: {
    width: '',
    height: '',
    length: '',
  },
  weight: '',
  departurePostOffice: '',
  destinationPostOffice: '',
  departureAddress: {
    country: '',
    state: '',
    city: '',
    street: '',
    tel: '',
    note: '',
  },
  destinationAddress: {
    country: '',
    state: '',
    city: '',
    street: '',
    tel: '',
    note: '',
  },
};

const initialValues: Omit<
  PackageForm,
  'createdAt' | 'updatedAt' | 'estimatedPickUpTime' | 'estimatedDeliveryTime' | 'price' | 'status'
> = {
  id: null,
  sender: '',
  receiver: '',
  senderObj: {
    username: '',
    email: '',
  },
  dimensions: {
    width: 0,
    height: 0,
    length: 0,
  },
  weight: 0,
  departurePostOffice: '',
  destinationPostOffice: '',
  departureAddress: null,
  destinationAddress: null,
};

const AddressSchema = object({
  country: string().min(3).max(255).nonempty('Country is required'),
  state: string().min(3).max(255).nonempty('State is required'),
  city: string().min(3).max(255).nonempty('City is required'),
  street: string().min(3).max(255).nonempty('Street is required'),
  tel: string().min(3).max(255).nonempty('Phone is required'),
  note: string().min(3).max(255).optional(),
});

const PackageSchema = object({
  id: number().nullable().optional(),
  sender: string().min(3).max(255).nullable().optional(),
  senderObj: object({
    username: string().min(3).max(255).nonempty('Sender username is required'),
    email: string().min(3).max(255).nonempty('Sender email is required'),
  }).optional(),
  receiver: string().min(3).max(255).nonempty('Receiver is required'),
  dimensions: object({
    width: coerce.number().min(0).max(1000),
    height: coerce.number().min(0).max(1000),
    length: coerce.number().min(0).max(1000),
  }).required(),
  weight: coerce.number().min(0).max(1000),
  departurePostOffice: string().min(3).max(255).optional(),
  destinationPostOffice: string().min(3).max(255).optional(),
  departureAddress: AddressSchema.nullable().optional(),
  destinationAddress: AddressSchema.nullable().optional(),
});

type PackageSchemaInput = TypeOf<typeof PackageSchema>;

const CreatePackage = ({ isAdmin }: { isAdmin: boolean }) => {
  const [packageDetails, setPackageDetails] = useState({ _id: null, price: 0 });
  const [showPayment, setShowPayment] = useState(false);
  const [errors, setErrors] = useState(initialErrors);
  const methods = useForm<PackageSchemaInput>({
    resolver: zodResolver(PackageSchema),
    defaultValues: initialValues,
  });
  const accordionConfig: AccordionsProps = {
    userAccordion: {
      sender: {
        errors,
        register: methods.register,
        field: 'senderObj',
      },
      receiver: {
        errors,
        register: methods.register,
        field: 'receiver',
      },
      onSenderChange: (senderId: string) => methods.setValue('sender', senderId),
    },
    packageDimensions: {
      errors,
      register: methods.register,
    },
    address: {
      pickUp: {
        errors,
        register: methods.register,
        field: 'departureAddress',
      },
      delivery: {
        errors,
        register: methods.register,
        field: 'destinationAddress',
      },
      pickUpPostOfficeId: methods.getValues().departurePostOffice || '',
      deliveryPostOfficeId: methods.getValues().destinationPostOffice || '',
      onPostOfficeSelect: (field: any, postOfficeId: string) => methods.setValue(field, postOfficeId),
    },
  };

  const onCreate = useCallback(async (event: FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      setErrors(initialErrors);
      const formData = new FormData(event.currentTarget);

      const destinationAddress = {
        country: formData.get('destinationAddress.country'),
        state: formData.get('destinationAddress.state'),
        city: formData.get('destinationAddress.city'),
        street: formData.get('destinationAddress.street'),
        tel: formData.get('destinationAddress.tel'),
        note: formData.get('destinationAddress.note'),
      };
      const departureAddress = {
        country: formData.get('departureAddress.country'),
        state: formData.get('departureAddress.state'),
        city: formData.get('departureAddress.city'),
        street: formData.get('departureAddress.street'),
        tel: formData.get('departureAddress.tel'),
        note: formData.get('departureAddress.note'),
      };

      const data = {
        sender: formData.get('sender') || 'test',
        senderObj: {
          username: formData.get('senderObj.username'),
          email: formData.get('senderObj.email'),
        },
        receiver: formData.get('receiver'),
        dimensions: {
          width: formData.get('width'),
          height: formData.get('height'),
          length: formData.get('length'),
        },
        weight: formData.get('weight'),
        departurePostOffice: formData.get('departurePostOffice') || 'test',
        destinationPostOffice: formData.get('destinationPostOffice') || 'test',
        departureAddress: departureAddress.country ? departureAddress : null,
        destinationAddress: destinationAddress.country ? destinationAddress : null,
      };

      const validatedData = PackageSchema.parse(data);

      const response = await fetch('http://localhost:3001/package', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(validatedData),
      });

      if (response.ok) {
        setShowPayment(true);
        const {
          data: { price, _id },
        } = await response.json();
        console.log(_id, price);

        setPackageDetails({ _id, price });
      } else {
        showNotification('Failed to create package', 'error');
      }
    } catch (err) {
      console.error(err);
      if (isZodError(err)) {
        setErrors(
          err.issues.reduce((acc, error) => {
            return { ...acc, [error.path[0]]: error.message };
          }, {} as PackageForm),
        );
      } else if (isApiError(err)) {
        const {
          data: { code, message },
        } = err;
        showNotification(`${code.toUpperCase()}: ${message}`, 'error');
      } else if (hasErrorMessage(err)) {
        showNotification(err.message, 'error');
      } else {
        showNotification('Unexpected error', 'error');
      }
    }
  }, []);

  return (
    <Box height="100vh">
      <Typography variant="h2">Create Package</Typography>
      {!showPayment && (
        <FormProvider {...methods}>
          <Box component="form" onSubmit={onCreate} sx={{ minHeight: '100vh' }} mt={4} noValidate>
            <ControlledAccordion accordions={accordions(accordionConfig)} />
            <LoadingButton type="submit" variant="contained" sx={styles.formButton}>
              Create
            </LoadingButton>
          </Box>
        </FormProvider>
      )}
      {showPayment && <PaymentPage price={packageDetails.price} packageId={packageDetails._id || ''} />}
    </Box>
  );
};

export { CreatePackage };
