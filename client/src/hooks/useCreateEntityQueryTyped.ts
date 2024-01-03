import { useCallback, useMemo } from 'react';
import { BaseEntityRequestData, CreateEntityResponse, useCreateEntityMutation } from '../api';

export function useCreateEntityQueryTyped<TResponseData, TRequestData>(baseEntityData: BaseEntityRequestData) {
  const [createEntity, createEntityReq] = useCreateEntityMutation();

  const create = useCallback(
    (requestData: TRequestData) => {
      const { entityName, entityUrl } = baseEntityData;

      return createEntity({
        entityName,
        entityUrl,
        body: requestData,
      });
    },
    [baseEntityData, createEntity],
  );

  const createRequest = useMemo(() => {
    return {
      ...createEntityReq,
      data: createEntityReq.data as CreateEntityResponse<TResponseData> | undefined,
    };
  }, [createEntityReq]);

  return [create, createRequest] as const;
}
