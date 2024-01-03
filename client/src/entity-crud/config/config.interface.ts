import { FC } from 'react';
import { GridColDef, GridValidRowModel } from '@mui/x-data-grid';
import { EntityListResponse, EntityResponse } from '../../api';
import { Endpoint, PermissionModule, PermissionResource, SerializerName } from '../../consts';
import { EntityConfigAndName, FiltersChangePayload, FiltersState } from '../../hooks';

export interface CreateEntityPageProps<EntityType = any> {
  create: (body: EntityType) => Promise<void>;
  isLoading: boolean;
}

export interface EditEntityPageProps<EntityType = any, UpdateEntityType = any> {
  isLoading: boolean;
  isUpdating: boolean;
  update: (body: UpdateEntityType) => Promise<void>;
  entityData?: EntityResponse<EntityType>;
}

export interface ListEntityPageProps<EntityType = any> {
  isLoading: boolean;
  entityConfig: EntityConfigAndName;
  apiUrl: string;
  data: EntityListResponse<EntityType> | undefined;
  filtersState: FiltersState;
  changeFiltersValue: (payload: FiltersChangePayload) => void;
  setDynamicQueryObj: (value: Record<string, string>) => void;
}

export interface ReadEntityPageProps<EntityType = any> {
  isLoading: boolean;
  entityData?: EntityResponse<EntityType>;
  entityId: string;
  entityName: string;
}

export interface Filter {
  type: 'text' | 'select';
  id: string | number;
  field: string;
  label: string;
}

interface Includes {
  list: string;
  edit: string;
  create: string;
  read: string;
}

export interface EntityConfig<TListEntity extends GridValidRowModel = any> {
  apiUrl: Endpoint;
  listPage?: FC<ListEntityPageProps<TListEntity>>;
  createPage?: FC<CreateEntityPageProps>;
  editPage?: FC<EditEntityPageProps>;
  readPage?: FC<ReadEntityPageProps>;
  serializerName: SerializerName;
  listColumns?: GridColDef<TListEntity>[];
  deleteNotAllowed?: boolean;
  createNotAllowed?: boolean;
  permission: {
    module: PermissionModule;
    resource: PermissionResource;
  };
  filters?: Filter[];
  includes: Partial<Includes>;
  deletableRowCondition?: (rowEl: TListEntity) => boolean;
  editableRowCondition?: (rowEl: TListEntity) => boolean;
}
