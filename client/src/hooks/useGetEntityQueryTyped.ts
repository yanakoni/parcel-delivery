import { EntityRequestData, useGetEntityQuery } from '../api';

export function useGetEntityQueryTyped<TResponseData>(
  queryData: EntityRequestData,
  options?: { skip: boolean },
) {
  const getRequest = useGetEntityQuery(queryData, options);

  return {
    ...getRequest,
    data: getRequest.data as TResponseData,
  };
}
