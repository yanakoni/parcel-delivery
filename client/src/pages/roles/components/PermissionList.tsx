import React, { FC, useCallback, useEffect, useState } from 'react';
import { Box, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel } from '@mui/material';
import { useGetEntityListQueryTyped } from '../../../hooks';
import { ENDPOINTS, ENTITIES } from '../../../consts';
import { Permission } from '../../../interfaces';
import { Loader } from '../../../components';

interface PermissionCheckerProps {
  name: string;
  checked: boolean;
  readonly: boolean;
  onChange: (name: string, checked: boolean) => void;
}

const PermissionChecker: FC<PermissionCheckerProps> = ({ name, checked, readonly, onChange }) => {
  const onCheck = useCallback(
    (_event: React.ChangeEvent<HTMLInputElement>, value: boolean) => {
      onChange(name, value);
    },
    [name, onChange],
  );

  return (
    <FormControlLabel
      control={<Checkbox disabled={readonly} checked={checked} name="gilad" onChange={onCheck} />}
      label={name}
    />
  );
};

interface PermissionListProps {
  initiallyChecked: string[];
  readonly?: boolean;
  onData: (values: string[]) => void;
}

export const PermissionList: FC<PermissionListProps> = ({ initiallyChecked, readonly = false, onData }) => {
  const [checked, setChecked] = useState<string[]>(initiallyChecked);

  useEffect(() => {
    onData(checked);
  }, [checked, onData]);

  const permissionsReq = useGetEntityListQueryTyped<Permission>({
    entityName: ENTITIES.PERMISSIONS,
    entity: ENDPOINTS.PERMISSIONS,
  });

  const onChange = useCallback(
    (name: string, value: boolean) => {
      if (value) {
        const newChecked = [...checked].concat(name);

        setChecked(newChecked);
        return;
      }

      const newChecked = [...checked].filter((checkedName) => name != checkedName);

      setChecked(newChecked);
    },
    [checked],
  );

  if (permissionsReq.isFetching) return <Loader type="page" />;

  return (
    <Box>
      <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
        <FormLabel component="legend">Permissions:</FormLabel>
        <FormGroup>
          {permissionsReq.data?.values.map((permission: Permission) => (
            <PermissionChecker
              key={permission.id}
              name={permission.code}
              checked={checked.includes(permission.code)}
              onChange={onChange}
              readonly={readonly}
            />
          ))}
        </FormGroup>
      </FormControl>
    </Box>
  );
};
