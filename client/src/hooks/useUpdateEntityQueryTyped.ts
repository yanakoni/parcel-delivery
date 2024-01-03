import { useCallback, useMemo } from 'react';
import { UpdateEntityRequestData, UpdateEntityResponse, useUpdateEntityMutation } from '../api';

export function useUpdateEntityQueryTyped<TResponseData, TRequestData extends { id: string }>(
  baseEntityData: Omit<UpdateEntityRequestData<TRequestData>, 'body' | 'id'>,
) {
  const [updateEntity, updateEntityReq] = useUpdateEntityMutation();

  const update = useCallback(
    (requestData: TRequestData) => {
      const { entityName, entityUrl, setIdInUrl = true } = baseEntityData;

      return updateEntity({
        setIdInUrl,
        entityName,
        entityUrl,
        id: requestData.id,
        body: {
          ...requestData,
        },
      });
    },
    [baseEntityData, updateEntity],
  );

  const updateRequest = useMemo(() => {
    return {
      ...updateEntityReq,
      data: updateEntityReq.data as UpdateEntityResponse<TResponseData> | undefined,
    };
  }, [updateEntityReq]);

  return [update, updateRequest] as const;
}
