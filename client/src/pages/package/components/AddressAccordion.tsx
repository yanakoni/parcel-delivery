import { ChangeEvent, useState } from 'react';
import { Checkbox, FormControlLabel, FormGroup, Grid } from '@mui/material';
import { PostOfficeSelector } from './PostOfficeSelector';
import { CreateAddressForm } from './CreateAddressForm';

interface AddressAccordionProps {
  pickUp: {
    errors: any;
    register: any;
    field: string;
  };
  delivery: {
    errors: any;
    register: any;
    field: string;
  };
  pickUpPostOfficeId: string;
  deliveryPostOfficeId: string;
  onPostOfficeSelect: (field: string, postOfficeId: string) => void;
}

const AddressAccordion = ({
  pickUp,
  delivery,
  pickUpPostOfficeId,
  deliveryPostOfficeId,
  onPostOfficeSelect,
}: AddressAccordionProps) => {
  const [pickUpFromHome, setPickUpFromHome] = useState(false);
  const [deliveryToHome, setDeliveryToHome] = useState(false);

  const handleChangePickUp = ({ target: { checked } }: ChangeEvent<HTMLInputElement>) => {
    setPickUpFromHome(checked);
  };

  const handleChangeDelivery = ({ target: { checked } }: ChangeEvent<HTMLInputElement>) => {
    setDeliveryToHome(checked);
  };

  return (
    <Grid container spacing={4}>
      <Grid item xs={6}>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={pickUpFromHome}
                onChange={handleChangePickUp}
                inputProps={{ 'aria-label': 'controlled' }}
              />
            }
            label="Do you want courie to pick up from your home?"
          />
        </FormGroup>
        {!pickUpFromHome && (
          <PostOfficeSelector
            selectedPostOfficeId={pickUpPostOfficeId}
            onPostOfficeSelect={(id: string) => onPostOfficeSelect('departurePostOffice', id)}
          />
        )}
        {pickUpFromHome && (
          <CreateAddressForm errors={pickUp.errors} register={pickUp.register} field={pickUp.field} hasNotes />
        )}
      </Grid>
      <Grid item xs={6}>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={deliveryToHome}
                onChange={handleChangeDelivery}
                inputProps={{ 'aria-label': 'controlled' }}
              />
            }
            label="Do you want to deliver by courier?"
          />
        </FormGroup>
        {!deliveryToHome && (
          <PostOfficeSelector
            selectedPostOfficeId={deliveryPostOfficeId}
            onPostOfficeSelect={(id: string) => onPostOfficeSelect('destinationPostOffice', id)}
          />
        )}
        {deliveryToHome && (
          <CreateAddressForm errors={delivery.errors} register={delivery.register} field={delivery.field} hasNotes />
        )}
      </Grid>
    </Grid>
  );
};

export { AddressAccordion };
export type { AddressAccordionProps };
