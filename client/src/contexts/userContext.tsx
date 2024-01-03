import { createContext } from 'react';
import { UserWithRole } from '../interfaces';

const defaultValue = {} as UserWithRole;

export const UserContext = createContext(defaultValue);
