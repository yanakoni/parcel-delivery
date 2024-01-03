import { UserRole } from '../consts';

type RoleStatus = 'active' | 'inactive' | 'archived';

export interface Role {
  id: string;
  accessScope: Record<string, boolean>;
  description: string;
  name: string;
  status: RoleStatus;
  roleType: UserRole;
  system: boolean;
}

export interface CreateRole {
  accessScope: Record<string, boolean>;
  description: string | null;
  name?: string;
}

export interface EditRole {
  accessScope: Record<string, boolean>;
  description?: string;
  name?: string;
}
