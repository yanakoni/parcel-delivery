import { apiSlice } from '../store';
import { EntityName } from '../entity-crud';
import { ENTITIES } from '../consts';

export interface BaseEntityRequestData {
  entity: { url: string; method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' };
  entityName: EntityName;
}

export interface EntityListRequestData extends BaseEntityRequestData {}
export interface EntityRequestData extends BaseEntityRequestData {
  entityId?: string;
  include?: string;
  filter?: string;
}

export interface CreateEntityRequestData<T = any> extends BaseEntityRequestData {
  body: T;
}

interface DeleteEntityRequestData extends BaseEntityRequestData {
  id: string;
}

export interface UpdateEntityRequestData<T = any> extends BaseEntityRequestData {
  id: string;
  body: T;
  setIdInUrl?: boolean;
}

interface DeleteEntityResponse {}

type JsonApiObject<T = any> = T;

export interface CursorPaginationMeta {
  count: number;
  size: number;
  before: string;
  after: string;
}

export interface PagePaginationMeta {
  page: number;
  pages: number;
  total: number;
  count: number;
}

export interface EntityListResponse<T = any> {
  values: JsonApiObject<T>[];
  meta: CursorPaginationMeta | PagePaginationMeta;
}
export type EntityResponse<T = any> = T;
export type CreateEntityResponse<T = any> = JsonApiObject<T>;
export type UpdateEntityResponse<T = any> = JsonApiObject<T>;

const entityApi = apiSlice
  .enhanceEndpoints({
    addTagTypes: Object.values(ENTITIES),
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      getEntityList: builder.query<EntityListResponse, EntityListRequestData>({
        query: ({ entity: { url, method } }) => ({
          method,
          url,
        }),
        providesTags: (result = { values: [], meta: {} as PagePaginationMeta }, _error, { entityName }) => [
          entityName,
          ...result.values.map(({ id }) => ({ type: entityName, id })),
        ],
      }),
      getEntity: builder.query<EntityResponse, EntityRequestData>({
        query: ({ entity: { url }, entityId, include, filter }) => {
          if (entityId) url += `/${entityId}`;
          if (include || filter) url += '?';
          if (include) url += `include=${include}&`;
          if (filter) url += `${filter}`;

          return {
            url,
          };
        },
        providesTags: ({ id }, _error, { entityName }) => [{ type: entityName, id }],
      }),
      createEntity: builder.mutation<CreateEntityResponse, CreateEntityRequestData>({
        query: ({ entity: { url, method }, body }) => ({
          method: method,
          url,
          body,
        }),
        invalidatesTags: (_result, _error, { entityName }) => [entityName],
      }),
      deleteEntity: builder.mutation<DeleteEntityResponse, DeleteEntityRequestData>({
        query: ({ entity: { url, method }, id }) => ({
          method: method,
          url: `${url}/${id}`,
        }),

        invalidatesTags: (_result, _error, { entityName, id }) => [{ type: entityName, id }],
      }),
      updateEntity: builder.mutation<UpdateEntityResponse, UpdateEntityRequestData>({
        query: ({ entity: { url, method }, id, body, setIdInUrl = true }) => ({
          method: method,
          url: setIdInUrl ? `${url}/${id}` : url,
          body: {
            ...body,
            id,
          },
        }),
        invalidatesTags: (_result, _error, { entityName, id }) => [{ type: entityName, id }],
      }),
    }),
  });

export const {
  useGetEntityListQuery,
  useGetEntityQuery,
  useCreateEntityMutation,
  useDeleteEntityMutation,
  useUpdateEntityMutation,
} = entityApi;
