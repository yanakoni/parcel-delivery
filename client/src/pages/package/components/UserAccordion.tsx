import { useEffect } from 'react';
import { Grid, TextField, Typography } from '@mui/material';
import { CreateUserForm } from './CreateUserForm';
import { useKeycloak } from '@react-keycloak/web';

interface UserAccordionProps {
  sender: {
    errors: any;
    register: any;
    field: string;
  };
  receiver: {
    errors: any;
    register: any;
    field: string;
  };
  onSenderChange: (senderId: string) => void;
}

const UserAccordion = ({ sender, receiver, onSenderChange }: UserAccordionProps) => {
  const { keycloak } = useKeycloak();
  const isSenderAuthenticated = keycloak.authenticated;

  useEffect(() => {
    if (isSenderAuthenticated) {
      // TODO get sender id from keycloak
      onSenderChange(keycloak.tokenParsed?.id);
    }
  }, [isSenderAuthenticated, onSenderChange]);

  return (
    <Grid container spacing={4}>
      {!isSenderAuthenticated && (
        <Grid item flexDirection="column" mb={3} xs={12}>
          <Typography variant="h6" mb={2}>
            Provide personal details
          </Typography>
          <CreateUserForm errors={sender.errors} register={sender.register} field={sender.field} />
        </Grid>
      )}
      <Grid item xs={6}>
        <TextField
          id={receiver.field}
          {...receiver.register(receiver.field)}
          label="Enter Receiver Email"
          type="email"
          autoComplete="off"
          helperText={receiver.errors[receiver.field]}
          error={!!receiver.errors[receiver.field]}
          fullWidth
        />
      </Grid>
    </Grid>
  );
};

export { UserAccordion };
export type { UserAccordionProps };
