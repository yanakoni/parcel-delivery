import { FC, useCallback, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ExpandLess, ExpandMore, SvgIconComponent } from '@mui/icons-material';
import { SxProps } from '@mui/system';
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText, Theme } from '@mui/material';
import { keycloak, UserRole } from '../../consts';
import { extractRoleFromRealmAccess } from '../../utils/keycloakRoles';

interface IMenuItem {
  id: number | string;
  label: string;
  icon: SvgIconComponent;
  to?: string;
  menuGroup?: string;
  nested?: IMenuItem[];
  // permission?: HasPermissionsArgs;
  roles?: UserRole[];
  excludeRoles?: UserRole[];
  isExternalLink?: boolean;
  sx?: SxProps<Theme>;
}

const MenuItem: FC<IMenuItem & { level?: number }> = ({
  label,
  icon: Icon,
  nested,
  to,
  menuGroup,
  roles,
  excludeRoles,
  isExternalLink,
  level = 0,
  sx,
}) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const userRole = extractRoleFromRealmAccess(keycloak?.tokenParsed?.realm_access?.roles);

  const anyNestedItemSelected = nested?.some((item) => item?.menuGroup && pathname.includes(item.menuGroup));
  const selected = useMemo(() => {
    if (menuGroup) {
      return pathname.includes(menuGroup);
    } else if (to) {
      return to === pathname;
    }

    return false;
  }, [pathname, to, menuGroup]);

  const availableForCurrentRole = useMemo(() => {
    if ((!roles && !excludeRoles) || !userRole) return true;

    if (roles) return roles?.includes(userRole);
    if (excludeRoles) return !excludeRoles?.includes(userRole);
  }, [roles, excludeRoles, userRole]);

  const [open, setOpen] = useState(selected || anyNestedItemSelected);

  const redirect = useCallback(() => {
    if (!to) return;

    if (isExternalLink) {
      return window.open(to, '_blank');
    }

    navigate(to);
  }, [navigate, to, isExternalLink]);

  const handleClick = useCallback(() => {
    if (nested) {
      return setOpen(!open);
    }

    redirect();
  }, [nested, open, redirect]);

  const style = {
    ...sx,
    ...(level && { pl: 4 * level }),
  };

  if (!availableForCurrentRole) return null;

  return (
    <>
      <ListItemButton sx={style} onClick={handleClick} selected={selected}>
        <ListItemIcon sx={{ minWidth: '36px' }}>
          <Icon width={24} height={24} />
        </ListItemIcon>
        <ListItemText primary={label} />
        {nested && (open ? <ExpandLess /> : <ExpandMore />)}
      </ListItemButton>
      {nested && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {nested.map((menuEl) => (
              <MenuItem key={menuEl.id} {...menuEl} level={level + 1} />
            ))}
          </List>
        </Collapse>
      )}
    </>
  );
};

export { MenuItem };
export type { IMenuItem };
